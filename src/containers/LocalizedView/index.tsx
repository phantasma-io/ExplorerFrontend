import React, { useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { MetaDynamic } from 'components/meta';
import {
  AppLayout,
  ViewHome,
  ViewAddress,
  ViewBlock,
  ViewContract,
  ViewDao,
  ViewEvent,
  ViewPlatform,
  ViewNft,
  ViewNexus,
  ViewSeries,
  ViewSearch,
  ViewToken,
  ViewTransaction,
} from '../index';

interface LocalizedViewProps {
  locale: Locales;
  route: ExplorerRoutes;
}

export const LocalizedView = ({ locale, route }: LocalizedViewProps) => {
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
      case '/contract':
        return `${echo('contract')} | ${echo('meta-title')}`;
      case '/dao':
        return `${echo('dao')} | ${echo('meta-title')}`;
      case '/event':
        return `${echo('event')} | ${echo('meta-title')}`;
      case '/platform':
        return `${echo('platform')} | ${echo('meta-title')}`;
      case '/nft':
        return `${echo('nft')} | ${echo('meta-title')}`;
      case '/series':
        return `${echo('series')} | ${echo('meta-title')}`;
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
      case '/contract':
        return `${echo('meta-contract')}`;
      case '/dao':
        return `${echo('meta-dao')}`;
      case '/event':
        return `${echo('meta-event')}`;
      case '/platform':
        return `${echo('meta-platform')}`;
      case '/nft':
        return `${echo('meta-nft')}`;
      case '/series':
        return `${echo('meta-series')}`;
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
      case '/contract':
        return <ViewContract />;
      case '/dao':
        return <ViewDao />;
      case '/event':
        return <ViewEvent />;
      case '/platform':
        return <ViewPlatform />;
      case '/nft':
        return <ViewNft />;
      case '/series':
        return <ViewSeries />;
      case '/search':
        return <ViewSearch />;
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
        <Box>{children}</Box>
      </Box>
    </AppLayout>
  );
};
