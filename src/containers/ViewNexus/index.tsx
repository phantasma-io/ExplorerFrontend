import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord, AddressesList } from 'components';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

const ChainsList = () => (
  <>
    <Text>ChainsList</Text>
  </>
);

const TokensList = () => (
  <>
    <Text>TokensList</Text>
  </>
);

const DaosList = () => (
  <>
    <Text>DaosList</Text>
  </>
);

export interface ViewNexusProps {
  tabForce?: ExplorerTabs;
}

export const ViewNexus = ({ tabForce = 'addresses' }: ViewNexusProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      addresses: {
        id: 'addresses',
        label: echo('tab-addresses'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <AddressesList />,
      },
      tokens: {
        id: 'tokens',
        label: echo('tab-tokens'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <TokensList />,
      },
      daos: {
        id: 'daos',
        label: echo('tab-daos'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <DaosList />,
      },
      chains: {
        id: 'chains',
        label: echo('tab-chains'),
        href: routes['/nexus'](echoActiveId as Locales),
        component: <ChainsList />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
