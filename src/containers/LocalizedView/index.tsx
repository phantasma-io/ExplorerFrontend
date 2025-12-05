import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { MetaDynamic } from 'components/meta';
import {
  AppLayout,
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
  ViewOracle,
} from '../index';

interface LocalizedViewProps {
  locale: Locales;
  route: ExplorerRoutes;
}

export const LocalizedView = ({ locale, route }: LocalizedViewProps) => {
  const { query, isReady } = useRouter();
  const { echo, echoSetById } = useEcho();
  const needsQuery =
    route === '/address' ||
    route === '/block' ||
    route === '/contract' ||
    route === '/dao' ||
    route === '/event' ||
    route === '/platform' ||
    route === '/oracle' ||
    route === '/nft' ||
    route === '/series' ||
    route === '/token' ||
    route === '/transaction' ||
    route === '/search';

  const ready =
    typeof window === 'undefined' ? !needsQuery : !needsQuery || isReady;

  useEffect(() => {
    echoSetById(locale);
  }, [echoSetById, locale]);

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
      default:
        return `${echo('nexus')} | ${echo('meta-title')}`;
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
      default:
        return `${echo('meta-nexus')}`;
    }
  }, [route, echo]);

  const children = useMemo(() => {
    if (needsQuery && (!ready || !query?.id)) {
      return null;
    }

    switch (route) {
      case '/nexus':
        return <ViewNexus />;
      case '/address':
        if (query?.id) {
          return <ViewAddress />;
        }
        return null;
      case '/block':
        if (query?.id) {
          return <ViewBlock />;
        }
        return null;
      case '/contract':
        if (query?.id) {
          return <ViewContract />;
        }
        return null;
      case '/dao':
        if (query?.id) {
          return <ViewDao />;
        }
        return null;
      case '/event':
        if (query?.id) {
          return <ViewEvent />;
        }
        return null;
      case '/platform':
        if (query?.id) {
          return <ViewPlatform />;
        }
        return null;
      case '/oracle':
        if (query?.id) {
          return <ViewOracle />;
        }
        return null;
      case '/nft':
        if (query?.id) {
          return <ViewNft />;
        }
        return null;
      case '/series':
        if (query?.id) {
          return <ViewSeries />;
        }
        return null;
      case '/search':
        return <ViewSearch />;
      case '/token':
        if (query?.id) {
          return <ViewToken />;
        }
        return null;
      case '/transaction':
        if (query?.id) {
          return <ViewTransaction />;
        }
        return null;
      default:
        return <ViewNexus />;
    }
  }, [needsQuery, ready, route, query]);

  return (
    <AppLayout>
      <Box>
        <MetaDynamic title={title} description={description} />
        <Box>{children}</Box>
      </Box>
    </AppLayout>
  );
};
