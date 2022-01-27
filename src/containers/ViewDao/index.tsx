import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes, Locales } from '../../cfg';

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

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
