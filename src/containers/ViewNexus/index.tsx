import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

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

export const ViewNexus = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      chains: {
        id: 'chains',
        label: echo('tab-chains'),
        href: routes['/nexus'](),
        component: <ChainsList />,
      },
      tokens: {
        id: 'tokens',
        label: echo('tab-tokens'),
        href: routes['/nexus'](),
        component: <TokensList />,
      },
      daos: {
        id: 'daos',
        label: echo('tab-daos'),
        href: routes['/nexus'](),
        component: <DaosList />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="chains" />;
};
