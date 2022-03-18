import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { useEcho } from '@ricardo-jrm/echo';
import { NavTabs, NavTabsRecord, Wip } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { BlockResults } from 'types/api';
import { BlockOverview } from './overview';

const EventsList = () => (
  <>
    <Wip />
  </>
);

const OraclesList = () => (
  <>
    <Wip />
  </>
);

const TransactionsList = () => (
  <>
    <Wip />
  </>
);

export interface ViewBlockProps {
  tabForce?: ExplorerTabs;
}

export const ViewBlock = ({ tabForce = 'overview' }: ViewBlockProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, loading, error } = useEmpathy<BlockResults>(
    endpoints['/blocks']({
      hash: (query?.id as string) || '',
      with_oracles: 0,
      with_transactions: 0,
      with_events: 0,
      with_event_data: 0,
      with_nft: 0,
      with_fiat: 0,
    }),
  );

  console.log({ data });

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/block'](echoActiveId as Locales),
        component: (
          <BlockOverview data={data} loading={loading} error={error} />
        ),
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/block'](echoActiveId as Locales),
        component: <EventsList />,
      },
      oracles: {
        id: 'oracles',
        label: echo('tab-oracles'),
        href: routes['/block'](echoActiveId as Locales),
        component: <OraclesList />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/block'](echoActiveId as Locales),
        component: <TransactionsList />,
      },
    }),
    [echo, echoActiveId, data],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
