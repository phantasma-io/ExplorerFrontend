import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from '../../components';
import { routes, Locales } from '../../cfg';

const ContractOverview = () => (
  <>
    <Text>ContractOverview</Text>
  </>
);

export const ViewContract = () => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/contract']({}, echoActiveId as Locales),
        component: <ContractOverview />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault="overview" />;
};
