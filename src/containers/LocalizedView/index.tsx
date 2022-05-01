import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { Text } from 'components/display';
import { MetaDynamic } from 'components/meta';
import {
  AppLayout,
  ViewHome,
  ViewAddress,
  ViewBlock,
  ViewNexus,
  ViewToken,
  ViewTransaction,
} from '../index';

interface LocalizedViewProps {
  locale: Locales;
  route: ExplorerRoutes;
}

export const LocalizedView = ({ locale, route }: LocalizedViewProps) => {
  const { query } = useRouter();
  const { echo, echoSetById } = useEcho();

  useEffect(() => {
    echoSetById(locale);
  });

  const title = useMemo(() => {
    switch (route) {
      case '/nexus':
        return `${echo('nexus')} | ${echo('meta-title')}`;
      case '/address':
        return `${echo('address')} | ${echo('meta-title')}`;
      case '/block':
        return `${echo('block')} | ${echo('meta-title')}`;
      case '/token':
        return `${echo('token')} | ${echo('meta-title')}`;
      case '/transaction':
        return `${echo('transaction')} | ${echo('meta-title')}`;
      case '/':
      default:
        return `${echo('meta-title')}`;
    }
  }, [route, echo]);

  const description = useMemo(() => {
    switch (route) {
      case '/nexus':
        return `${echo('meta-nexus')}`;
      case '/address':
        return `${echo('meta-address')}`;
      case '/block':
        return `${echo('meta-block')}`;
      case '/token':
        return `${echo('meta-token')}`;
      case '/transaction':
        return `${echo('meta-transaction')}`;
      case '/':
      default:
        return `${echo('meta-home')}`;
    }
  }, [route, echo]);

  const children = useMemo(() => {
    switch (route) {
      case '/nexus':
        return <ViewNexus />;
      case '/address':
        return <ViewAddress />;
      case '/block':
        return <ViewBlock />;
      case '/token':
        return <ViewToken />;
      case '/transaction':
        return <ViewTransaction />;
      case '/':
      default:
        return <ViewHome />;
    }
  }, [route]);

  return (
    <AppLayout>
      <Box>
        <MetaDynamic title={title} description={description} />
        {route !== '/' && (
          <Box
            pt={{ xs: 3, lg: 6 }}
            pb={{ xs: 3, lg: route === '/nexus' ? 3 : 0.5 }}
          >
            <Text
              variant={route === '/nexus' ? 'h4' : 'h5'}
              sx={{ color: '#fff' }}
              value={echo(`details-${query?.view as string}`)}
            />
          </Box>
        )}
        <Box>{children}</Box>
      </Box>
    </AppLayout>
  );
};
