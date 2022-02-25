import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { Text, NavTabs, NavTabsRecord } from 'components';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';

const ContractOverview = () => (
  <>
    <Text>ContractOverview</Text>
  </>
);

export interface ViewContractProps {
  tabForce?: ExplorerTabs;
}

export const ViewContract = ({ tabForce = 'overview' }: ViewContractProps) => {
  const { echo, echoActiveId } = useEcho();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/contract'](echoActiveId as Locales),
        component: <ContractOverview />,
      },
    }),
    [echo, echoActiveId],
  );

  return <NavTabs tabs={tabs} tabsDefault={tabForce} />;
};
