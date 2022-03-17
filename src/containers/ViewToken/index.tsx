import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text } from 'components/display';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

const TokenOverview = () => (
  <>
    <Text>TokenOverview</Text>
  </>
);

export interface ViewTokenProps {
  tabForce?: ExplorerTabs;
}

export const ViewToken = ({ tabForce = 'overview' }: ViewTokenProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/token'](echoActiveId as Locales),
        component: <TokenOverview />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
