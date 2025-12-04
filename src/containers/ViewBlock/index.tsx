import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { BlockResults } from 'types/api';
import { BlockOverview } from './overview';
import { BlockEvents } from './events';
import { BlockOracles } from './oracles';
import { BlockTransactions } from './transactions';
import { BlockRaw } from './raw';

export interface ViewBlockProps {
  tabForce?: ExplorerTabs;
}

export const ViewBlock = ({ tabForce = 'overview' }: ViewBlockProps) => {
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const { data, loading, error } = useApi<BlockResults>(
    endpoints['/blocks']({
      id: (query?.id as string) || '',
      with_fiat: 1,
      with_events: 1,
      with_event_data: 1,
      with_nft: 1,
    }),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/block'](locale as Locales),
        component: (
          <BlockOverview data={data} loading={loading} error={error} />
        ),
      },
      transactions: {
        id: 'transactions',
        label: t('tab-transactions'),
        href: routes['/block'](locale as Locales),
        component: <BlockTransactions />,
      },
      events: {
        id: 'events',
        label: t('tab-events'),
        href: routes['/block'](locale as Locales),
        component: <BlockEvents />,
      },
      oracles: {
        id: 'oracles',
        label: t('tab-oracles'),
        href: routes['/block'](locale as Locales),
        component: <BlockOracles hash={(query?.id as string) || ''} />,
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/block'](locale as Locales),
        component: <BlockRaw data={data} loading={loading} error={error} />,
      },
    }),
    [t, locale, data, error, loading, query],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="blocks" route="/block" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
