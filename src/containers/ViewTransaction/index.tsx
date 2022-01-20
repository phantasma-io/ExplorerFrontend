import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

const TransactionOverview = () => (
  <>
    <Text>TransactionOverview</Text>
  </>
);

const TransactionScript = () => (
  <>
    <Text>TransactionScript</Text>
  </>
);

const EventsList = () => (
  <>
    <Text>EventsList</Text>
  </>
);

export const ViewTransaction = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/transaction'](),
        component: <TransactionOverview />,
      },
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/transaction'](),
        component: <TransactionScript />,
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/transaction'](),
        component: <EventsList />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
