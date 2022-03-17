import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text } from 'components/display';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

const ChainOverview = () => (
  <>
    <Text>ChainOverview</Text>
  </>
);

const BlocksList = () => (
  <>
    <Text>BlocksList</Text>
  </>
);

const ContractsList = () => (
  <>
    <Text>ContractsList</Text>
  </>
);

export interface ViewChainProps {
  tabForce?: ExplorerTabs;
}

export const ViewChain = ({ tabForce = 'overview' }: ViewChainProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/chain'](echoActiveId as Locales),
        component: <ChainOverview />,
      },
      blocks: {
        id: 'blocks',
        label: echo('tab-blocks'),
        href: routes['/chain'](echoActiveId as Locales),
        component: <BlocksList />,
      },
      contracts: {
        id: 'contracts',
        label: echo('tab-contracts'),
        href: routes['/chain'](echoActiveId as Locales),
        component: <ContractsList />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
