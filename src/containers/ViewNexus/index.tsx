import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import {
  AddressesList,
  BlocksList,
  ContractsList,
  DaosList,
  NftsList,
  TokensList,
  TransactionsList,
  PlatformsList,
  EventsList,
  SeriesList,
} from 'components/list';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { useI18n } from 'hooks';

export interface ViewNexusProps {
  tabForce?: ExplorerTabs;
}

export const ViewNexus = ({ tabForce = 'blocks' }: ViewNexusProps) => {
  const { t, locale } = useI18n();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      addresses: {
        id: 'addresses',
        label: t('tab-addresses'),
        href: routes['/nexus'](locale as Locales),
        component: <AddressesList />,
      },
      blocks: {
        id: 'blocks',
        label: t('tab-blocks'),
        href: routes['/nexus'](locale as Locales),
        component: <BlocksList />,
      },
      contracts: {
        id: 'contracts',
        label: t('tab-contracts'),
        href: routes['/nexus'](locale as Locales),
        component: <ContractsList />,
      },
      daos: {
        id: 'daos',
        label: t('tab-daos'),
        href: routes['/nexus'](locale as Locales),
        component: <DaosList />,
      },
      events: {
        id: 'events',
        label: t('tab-events'),
        href: routes['/nexus'](locale as Locales),
        component: <EventsList />,
      },
      nfts: {
        id: 'nfts',
        label: t('tab-nfts'),
        href: routes['/nexus'](locale as Locales),
        component: <NftsList />,
      },
      platforms: {
        id: 'platforms',
        label: t('tab-platforms'),
        href: routes['/nexus'](locale as Locales),
        component: <PlatformsList />,
      },
      series: {
        id: 'series',
        label: t('tab-series'),
        href: routes['/nexus'](locale as Locales),
        component: <SeriesList />,
      },
      tokens: {
        id: 'tokens',
        label: t('tab-tokens'),
        href: routes['/nexus'](locale as Locales),
        component: <TokensList />,
      },
      transactions: {
        id: 'transactions',
        label: t('tab-transactions'),
        href: routes['/nexus'](locale as Locales),
        component: <TransactionsList />,
      },
      // chains: {
      //   id: 'chains',
      //   label: echo('tab-chains'),
      //   href: routes['/nexus'](echoActiveId as Locales),
      //   component: <ChainsList />,
      // },
    }),
    [t, locale],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="addresses" route="/nexus" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
