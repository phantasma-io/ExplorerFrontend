import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { routes, endpoints } from 'cfg';
import { AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { AddressOverview } from './overview';
import { AddressTransactions } from './transactions';
import { AddressEvents } from './events';
import { AddressRaw } from './raw';

export interface ViewAddressProps {
  tabForce?: ExplorerTabs;
}

export const ViewAddress = ({ tabForce = 'overview' }: ViewAddressProps) => {
  const { t, locale } = useI18n();

  const { query } = useRouter();

  const { data, loading, error } = useApi<AddressResults>(
    endpoints['/addresses']({
      address: (query?.id as string) || '',
      with_balance: 1,
      with_stakes: 1,
      with_storage: 1,
    }),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: t('tab-overview'),
        href: routes['/address'](locale as Locales),
        component: (
          <AddressOverview data={data} loading={loading} error={error} />
        ),
      },
      transactions: {
        id: 'transactions',
        label: t('tab-transactions'),
        href: routes['/address'](locale as Locales),
        component: <AddressTransactions />,
      },
      events: {
        id: 'events',
        label: t('tab-events'),
        href: routes['/address'](locale as Locales),
        component: <AddressEvents />,
      },
      raw: {
        id: 'raw',
        label: t('tab-raw'),
        href: routes['/address'](locale as Locales),
        component: <AddressRaw data={data} loading={loading} error={error} />,
      },
    }),
    [t, locale, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="addresses" route="/address" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
