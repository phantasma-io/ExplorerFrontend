import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { ExplorerRoutes } from 'types/routes';
import { MetaDynamic } from 'components/meta';
import { useI18n } from 'hooks';
import { AppLayout } from '../AppLayout';
import { ViewBlock } from '../ViewBlock';
import dynamic from 'next/dynamic';

type ViewComponent = React.ComponentType<Record<string, unknown>>;

// Load views on demand to avoid pulling the whole app tree for simple routes.
// Casts are needed because views are named exports, not defaults.
const makeDynamicView = (loader: () => Promise<unknown>) =>
  dynamic(loader as any) as unknown as ViewComponent;

const ViewHome = makeDynamicView(() =>
  import('../ViewHome').then((mod) => mod.ViewHome),
);
const ViewAddress = makeDynamicView(() =>
  import('../ViewAddress').then((mod) => mod.ViewAddress),
);
const ViewContract = makeDynamicView(() =>
  import('../ViewContract').then((mod) => mod.ViewContract),
);
const ViewDao = makeDynamicView(() =>
  import('../ViewDao').then((mod) => mod.ViewDao),
);
const ViewEvent = makeDynamicView(() =>
  import('../ViewEvent').then((mod) => mod.ViewEvent),
);
const ViewPlatform = makeDynamicView(() =>
  import('../ViewPlatform').then((mod) => mod.ViewPlatform),
);
const ViewNft = makeDynamicView(() =>
  import('../ViewNft').then((mod) => mod.ViewNft),
);
const ViewNexus = makeDynamicView(() =>
  import('../ViewNexus').then((mod) => mod.ViewNexus),
);
const ViewSeries = makeDynamicView(() =>
  import('../ViewSeries').then((mod) => mod.ViewSeries),
);
const ViewSearch = makeDynamicView(() =>
  import('../ViewSearch').then((mod) => mod.ViewSearch),
);
const ViewToken = makeDynamicView(() =>
  import('../ViewToken').then((mod) => mod.ViewToken),
);
const ViewTransaction = makeDynamicView(() =>
  import('../ViewTransaction').then((mod) => mod.ViewTransaction),
);
const ViewOracle = makeDynamicView(() =>
  import('../ViewOracle').then((mod) => mod.ViewOracle),
);

interface LocalizedViewProps {
  route: ExplorerRoutes;
}

export const LocalizedView = ({ route }: LocalizedViewProps) => {
  const { query } = useRouter();
  const { t } = useI18n();

  const title = useMemo(() => {
    switch (route) {
      case '/nexus':
        return `${t('nexus')} | ${t('meta-title')}`;
      case '/address':
        return `${t('address')} | ${t('meta-title')}`;
      case '/block':
        return `${t('block')} | ${t('meta-title')}`;
      case '/contract':
        return `${t('contract')} | ${t('meta-title')}`;
      case '/dao':
        return `${t('dao')} | ${t('meta-title')}`;
      case '/event':
        return `${t('event')} | ${t('meta-title')}`;
      case '/platform':
        return `${t('platform')} | ${t('meta-title')}`;
      case '/nft':
        return `${t('nft')} | ${t('meta-title')}`;
      case '/series':
        return `${t('series')} | ${t('meta-title')}`;
      case '/token':
        return `${t('token')} | ${t('meta-title')}`;
      case '/transaction':
        return `${t('transaction')} | ${t('meta-title')}`;
      case '/':
      default:
        return `${t('meta-title')}`;
    }
  }, [route, t]);

  const description = useMemo(() => {
    switch (route) {
      case '/nexus':
        return `${t('meta-nexus')}`;
      case '/address':
        return `${t('meta-address')}`;
      case '/block':
        return `${t('meta-block')}`;
      case '/contract':
        return `${t('meta-contract')}`;
      case '/dao':
        return `${t('meta-dao')}`;
      case '/event':
        return `${t('meta-event')}`;
      case '/platform':
        return `${t('meta-platform')}`;
      case '/nft':
        return `${t('meta-nft')}`;
      case '/series':
        return `${t('meta-series')}`;
      case '/token':
        return `${t('meta-token')}`;
      case '/transaction':
        return `${t('meta-transaction')}`;
      case '/':
      default:
        return `${t('meta-home')}`;
    }
  }, [route, t]);

  const children = useMemo(() => {
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
      case '/':
      default:
        return <ViewHome />;
    }
  }, [route, query]);

  return (
    <AppLayout>
      <Box>
        <MetaDynamic title={title} description={description} />
        <Box>{children}</Box>
      </Box>
    </AppLayout>
  );
};
