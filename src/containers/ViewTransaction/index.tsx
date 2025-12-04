import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { useApi, useI18n } from 'hooks';
import { routes, endpoints } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { TransactionResults } from 'types/api';
import { TransactionOverview } from './overview';
import { TransactionEvents } from './events';
import { TransactionRaw } from './raw';
import { TransactionAdvanced } from './advanced';

export interface ViewTransactionProps {
  tabForce?: ExplorerTabs;
}

export const ViewTransaction = ({
  tabForce = 'overview',
}: ViewTransactionProps) => {
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const txHash = query?.id as string | undefined;

  const { data, error, loading } = useApi<TransactionResults>(
    txHash
      ? endpoints['/transactions']({
          hash: txHash,
          with_events: 1,
          with_event_data: 1,
          with_fiat: 1,
          with_nft: 1,
        })
      : null,
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/transaction'](locale as Locales),
        component: (
          <TransactionOverview data={data} loading={loading} error={error} />
        ),
      },
      advanced: {
        id: 'advanced',
        label: t('tab-advanced'),
        href: routes['/transaction'](locale as Locales),
        component: (
          <TransactionAdvanced data={data} loading={loading} error={error} />
        ),
      },
      events: {
        id: 'events',
        label: t('tab-events'),
        href: routes['/transaction'](locale as Locales),
        component: <TransactionEvents />,
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/transaction'](locale as Locales),
        component: (
          <TransactionRaw data={data} loading={loading} error={error} />
        ),
      },
    }),
    [data, t, locale, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="transactions" route="/transaction" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
