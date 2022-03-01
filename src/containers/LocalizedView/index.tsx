import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { Text, MetaDynamic } from 'components';
import {
  AppLayout,
  ViewHome,
  ViewAddress,
  ViewBlock,
  ViewChain,
  ViewContract,
  ViewDao,
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
      case '/address':
        return `${echo('address')} | ${echo('meta-title')}`;
      case '/block':
        return `${echo('block')} | ${echo('meta-title')}`;
      case '/chain':
        return `${echo('chain')} | ${echo('meta-title')}`;
      case '/contract':
        return `${echo('contract')} | ${echo('meta-title')}`;
      case '/dao':
        return `${echo('dao')} | ${echo('meta-title')}`;
      case '/nexus':
        return `${echo('nexus')} | ${echo('meta-title')}`;
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
      case '/address':
        return `${echo('meta-address')}`;
      case '/block':
        return `${echo('meta-block')}`;
      case '/chain':
        return `${echo('meta-chain')}`;
      case '/contract':
        return `${echo('meta-contract')}`;
      case '/dao':
        return `${echo('meta-dao')}`;
      case '/nexus':
        return `${echo('meta-nexus')}`;
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
      case '/address':
        return <ViewAddress />;
      case '/block':
        return <ViewBlock />;
      case '/chain':
        return <ViewChain />;
      case '/contract':
        return <ViewContract />;
      case '/dao':
        return <ViewDao />;
      case '/nexus':
        return <ViewNexus />;
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
          <Box pt={{ xs: 3, lg: 6 }} pb={3}>
            <Text
              variant="h3"
              sx={{ color: '#fff' }}
              value={echo(`title-${query?.view as string}`)}
            />
          </Box>
        )}
        <Box>{children}</Box>
      </Box>
    </AppLayout>
  );
};
