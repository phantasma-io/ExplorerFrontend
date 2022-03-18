import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { useEcho } from '@ricardo-jrm/echo';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { routes, endpoints } from 'cfg';
import { AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { AddressOverview } from './overview';
import { AddressBalances } from './balances';
import { AddressTransactions } from './transactions';

export interface ViewAddressProps {
  tabForce?: ExplorerTabs;
}

export const ViewAddress = ({ tabForce = 'overview' }: ViewAddressProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, loading, error } = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      address: (query?.id as string) || '',
      with_balance: 1,
      with_stakes: 0,
      with_storage: 1,
      with_transactions: 0,
    }),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/address'](echoActiveId as Locales),
        component: (
          <AddressOverview data={data} loading={loading} error={error} />
        ),
      },
      balances: {
        id: 'balances',
        label: echo('tab-balances'),
        href: routes['/address'](echoActiveId as Locales),
        component: (
          <AddressBalances data={data} loading={loading} error={error} />
        ),
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/address'](echoActiveId as Locales),
        component: <AddressTransactions />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
