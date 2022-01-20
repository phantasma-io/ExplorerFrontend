import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

const BlockOverview = () => (
  <>
    <Text>BlockOverview</Text>
  </>
);

const TransactionsList = () => (
  <>
    <Text>TransactionsList</Text>
  </>
);

const EventsList = () => (
  <>
    <Text>EventsList</Text>
  </>
);

const OraclesList = () => (
  <>
    <Text>OraclesList</Text>
  </>
);

export const ViewBlock = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/block'](),
        component: <BlockOverview />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/block'](),
        component: <TransactionsList />,
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/block'](),
        component: <EventsList />,
      },
      oracles: {
        id: 'oracles',
        label: echo('tab-oracles'),
        href: routes['/block'](),
        component: <OraclesList />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
