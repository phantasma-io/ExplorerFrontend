import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes, Locales, ExplorerTabs } from '../../cfg';

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

export interface ViewBlockProps {
  tabForce?: ExplorerTabs;
}

export const ViewBlock = ({ tabForce = 'overview' }: ViewBlockProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/block'](echoActiveId as Locales),
        component: <BlockOverview />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/block'](echoActiveId as Locales),
        component: <TransactionsList />,
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
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
