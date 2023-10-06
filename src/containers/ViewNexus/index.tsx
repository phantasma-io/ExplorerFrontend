import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
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

export interface ViewNexusProps {
  tabForce?: ExplorerTabs;
}

export const ViewNexus = ({ tabForce = 'blocks' }: ViewNexusProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      addresses: {
        id: 'addresses',
        label: echo('tab-addresses'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <AddressesList />,
      },
      blocks: {
        id: 'blocks',
        label: echo('tab-blocks'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <BlocksList />,
      },
      contracts: {
        id: 'contracts',
        label: echo('tab-contracts'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <ContractsList />,
      },
      daos: {
        id: 'daos',
        label: echo('tab-daos'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <DaosList />,
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <EventsList />,
      },
      nfts: {
        id: 'nfts',
        label: echo('tab-nfts'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <NftsList />,
      },
      platforms: {
        id: 'platforms',
        label: echo('tab-platforms'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <PlatformsList />,
      },
      series: {
        id: 'series',
        label: echo('tab-series'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <SeriesList />,
      },
      tokens: {
        id: 'tokens',
        label: echo('tab-tokens'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <TokensList />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <TransactionsList />,
      },
      // chains: {
      //   id: 'chains',
      //   label: echo('tab-chains'),
      //   href: routes['/nexus'](echoActiveId as Locales),
      //   component: <ChainsList />,
      // },
    }),
    [echo, echoActiveId],
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
