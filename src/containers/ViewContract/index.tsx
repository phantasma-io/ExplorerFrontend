import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useApi } from 'hooks';
import { useEcho } from 'hooks/useEcho';
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

  const { query, isReady } = useRouter();
  const ready = typeof window === 'undefined' ? true : isReady;

  const { data, error, loading } = useApi<ContractResults>(
    ready && query?.id
      ? endpoints['/contracts']({
          hash: (query?.id as string) || '',
          with_creation_event: 1,
          with_methods: 1,
          with_script: 1,
          with_token: 1,
        } as ContractParams)
      : null,
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
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/contract'](echoActiveId as Locales),
        component: (
          <ContractScript data={data} loading={loading} error={error} />
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

  if (!ready || !query?.id) {
    return null;
  }

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
