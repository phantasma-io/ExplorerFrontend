import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import {
  BlocksList,
  ContractsList,
  DaosList,
  NftsList,
  TokensList,
  TransactionsList,
  SeriesList,
  EventsList,
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
      blocks: {
        id: 'blocks',
        label: echo('tab-blocks'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <BlocksList />,
      },
      transactions: {
        id: 'transactions',
        label: echo('tab-transactions'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <TransactionsList />,
      },
      events: {
        id: 'events',
        label: echo('tab-events'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <EventsList />,
      },
      contracts: {
        id: 'contracts',
        label: echo('tab-contracts'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <ContractsList />,
      },
      tokens: {
        id: 'tokens',
        label: echo('tab-tokens'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <TokensList />,
      },
      series: {
        id: 'series',
        label: echo('tab-series'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <SeriesList />,
      },
      nfts: {
        id: 'nfts',
        label: echo('tab-nfts'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <NftsList />,
      },
      daos: {
        id: 'daos',
        label: echo('tab-daos'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <DaosList />,
      },
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
