import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

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

export const ViewChain = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/chain'](),
        component: <ChainOverview />,
      },
      blocks: {
        id: 'blocks',
        label: echo('tab-blocks'),
        href: routes['/chain'](),
        component: <BlocksList />,
      },
      contracts: {
        id: 'contracts',
        label: echo('tab-contracts'),
        href: routes['/chain'](),
        component: <ContractsList />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
