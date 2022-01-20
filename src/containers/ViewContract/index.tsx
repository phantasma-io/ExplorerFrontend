import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

const ContractOverview = () => (
  <>
    <Text>ContractOverview</Text>
  </>
);

export const ViewContract = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/contract'](),
        component: <ContractOverview />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
