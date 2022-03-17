import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text } from 'components/display';
import { NavTabs, NavTabsRecord } from 'components/layout';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

const DaoOverview = () => (
  <>
    <Text>DaoOverview</Text>
  </>
);

const DaoMembers = () => (
  <>
    <Text>DaoMembers</Text>
  </>
);

export interface ViewDaoProps {
  tabForce?: ExplorerTabs;
}

export const ViewDao = ({ tabForce = 'overview' }: ViewDaoProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/dao'](echoActiveId as Locales),
        component: <DaoOverview />,
      },
      members: {
        id: 'members',
        label: echo('tab-members'),
        href: routes['/dao'](echoActiveId as Locales),
        component: <DaoMembers />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
