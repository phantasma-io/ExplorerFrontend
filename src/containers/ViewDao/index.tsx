import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes } from '../../cfg';

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

export const ViewDao = () => {
  const { echo } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/dao'](),
        component: <DaoOverview />,
      },
      members: {
        id: 'members',
        label: echo('tab-members'),
        href: routes['/dao'](),
        component: <DaoMembers />,
      },
    }),
    [echo],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
