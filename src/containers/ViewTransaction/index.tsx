import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from 'components';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

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

export interface ViewTransactionProps {
  tabForce?: ExplorerTabs;
}

export const ViewTransaction = ({
  tabForce = 'overview',
}: ViewTransactionProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: <TransactionOverview />,
      },
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: <TransactionScript />,
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/transaction'](echoActiveId as Locales),
        component: <EventsList />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
