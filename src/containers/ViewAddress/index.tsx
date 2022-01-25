import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes, Locales } from '../../cfg';

const AddressOverview = () => (
  <>
    <Text>AddressOverview</Text>
  </>
);

const BalancesList = () => (
  <>
    <Text>BalancesList</Text>
  </>
);

const TransactionsList = () => (
  <>
    <Text>TransactionsList</Text>
  </>
);

export const ViewAddress = () => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/address']({}, echoActiveId as Locales),
        component: <AddressOverview />,
      },
      balances: {
        id: 'balances',
        label: echo('tab-balances'),
        href: routes['/address']({}, echoActiveId as Locales),
        component: <BalancesList />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/address']({}, echoActiveId as Locales),
        component: <TransactionsList />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
