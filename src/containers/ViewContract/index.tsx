import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { ContractResults, ContractParams } from 'types/api';
import { ContractOverview } from './overview';
import { ContractRaw } from './raw';
import { ContractScript } from './script';
import { ContractInstructions } from './instructions';
import { ContractMethods } from './methods';

export interface ViewContractProps {
  tabForce?: ExplorerTabs;
}

export const ViewContract = ({ tabForce = 'overview' }: ViewContractProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<ContractResults>(
    endpoints['/contracts']({
      symbol: (query?.id as string) || '',
      with_creation_event: 1,
      with_methods: 1,
      with_script: 1,
      with_token: 1,
    } as ContractParams),
  );

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/contract'](echoActiveId as Locales),
        component: (
          <ContractOverview data={data} loading={loading} error={error} />
        ),
      },
      methods: {
        id: 'methods',
        label: echo('tab-methods'),
        href: routes['/contract'](echoActiveId as Locales),
        component: (
          <ContractMethods data={data} loading={loading} error={error} />
        ),
      },
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/contract'](echoActiveId as Locales),
        component: (
          <ContractScript data={data} loading={loading} error={error} />
        ),
      },
      instructions: {
        id: 'instructions',
        label: echo('tab-instructions'),
        href: routes['/contract'](echoActiveId as Locales),
        component: (
          <ContractInstructions
            data={data}
            loading={loading}
            error={error}
            scr={
              data?.contracts &&
              data?.contracts[0] &&
              data?.contracts[0].script_raw
            }
          />
        ),
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/contract'](echoActiveId as Locales),
        component: <ContractRaw data={data} loading={loading} error={error} />,
      },
    }),
    [echo, echoActiveId, data, error, loading],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="contracts" route="/contract" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
