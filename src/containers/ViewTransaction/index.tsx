import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { routes, endpoints } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { TransactionResults } from 'types/api';
import { TransactionOverview } from './overview';
import { TransactionEvents } from './events';

export interface ViewTransactionProps {
  tabForce?: ExplorerTabs;
}

export const ViewTransaction = ({
  tabForce = 'overview',
}: ViewTransactionProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, loading, error } = useEmpathy<TransactionResults>(
    endpoints['/transactions']({
      hash: (query?.id as string) || '',
    }),
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
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: <TransactionEvents />,
      },
    }),
    [data, echo, echoActiveId, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="transactions" label={echo('tab-transactions')} />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
