import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

const TokenOverview = () => (
  <>
    <Text>TokenOverview</Text>
  </>
);

export const ViewToken = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/token'](),
        component: <TokenOverview />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
