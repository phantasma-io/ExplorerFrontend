import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes, Locales } from '../../cfg';

const TokenOverview = () => (
  <>
    <Text>TokenOverview</Text>
  </>
);

export const ViewToken = () => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/token']({}, echoActiveId as Locales),
        component: <TokenOverview />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
