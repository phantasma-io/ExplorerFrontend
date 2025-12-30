import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { useApi } from 'hooks';
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
  const { echo, echoActiveId } = useEcho();

  const { query, isReady } = useRouter();
  const ready = typeof window === 'undefined' ? true : isReady;

  const txHash = query?.id as string | undefined;

  const { data, error, loading } = useApi<TransactionResults>(
    ready && txHash
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
        label: echo('tab-overview'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: (
          <TransactionOverview data={data} loading={loading} error={error} />
        ),
      },
      advanced: {
        id: 'advanced',
        label: echo('tab-advanced'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: (
          <TransactionAdvanced data={data} loading={loading} error={error} />
        ),
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: <TransactionEvents />,
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: (
          <TransactionRaw data={data} loading={loading} error={error} />
        ),
      },
    }),
    [data, echo, echoActiveId, error, loading],
  );

  if (!ready || !txHash) {
    return null;
  }

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
