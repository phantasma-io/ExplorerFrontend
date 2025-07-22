import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { useEcho } from '@ricardojrmcom/echo';
import { NavTabs, NavTabsRecord, Breadcrumbs } from 'components/layout';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import { TokenResults, TokenParams, AddressResults } from 'types/api';
import { TokenOverview } from './overview';
import { TokenScript } from './script';
import { TokenInstructions } from './instructions';
import { TokenRaw } from './raw';
import { AddressOverview } from 'containers/ViewAddress/overview';
import { useAddressesTopTokenHoldersData } from 'hooks/api/addresses';
import { Table } from 'components/table';
import { useTable } from 'hooks';

export interface ViewTokenProps {
  tabForce?: ExplorerTabs;
}

export const ViewToken = ({ tabForce = 'overview' }: ViewTokenProps) => {
  const { echo, echoActiveId } = useEcho();

  const { query } = useRouter();

  const { data, error, loading } = useEmpathy<TokenResults>(
    endpoints['/tokens']({
      symbol: (query?.id as string) || '',
      with_logo: 1,
      with_price: 1,
    } as TokenParams),
  );

  const holders_res = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      order_by: "balance",
      order_direction: "desc",
      offset: 0,
      limit: 100,
      chain: "main",
      symbol: (query?.id as string) || '',
      with_balance: 1,
    } as TokenParams),
  );

  // let holders_data = holders_res.data;
  // let holders_error = holders_res.error;
  // let holders_loading = holders_res.loading;

  const { cols: holder_cols, rows: holder_rows, total: holder_total } = useAddressesTopTokenHoldersData(query.id as string, holders_res.data, holders_res.loading);
  const holdersTableProps = useTable();

  const tabs: NavTabsRecord = useMemo(
    () => ({
      overview: {
        id: 'overview',
        label: echo('tab-overview'),
        href: routes['/token'](echoActiveId as Locales),
        component: (
          <TokenOverview data={data} loading={loading} error={error} />
        ),
      },
      holders: {
        id: 'holders',
        label: "Top Holders",
        href: routes['/token'](echoActiveId as Locales),
        component: (
            <Table
              tableId="PhantasmaExplorer-Addresses-TopHolders"
              raw={holders_res.data?.addresses || []}
              cols={holder_cols}
              rows={holder_rows}
              total={holder_total}
              linkOptions={{
                route: '/address',
                key: 'address',
                title: echo('explore-address'),
              }}
              {...holdersTableProps}
              loading={holders_res.loading}
              error={holders_res.error}
              hideControls={true}
            />
        ),
      },
      instructions: {
        id: 'instructions',
        label: echo('tab-instructions'),
        href: routes['/token'](echoActiveId as Locales),
        component: (
          <TokenInstructions
            data={data}
            loading={loading}
            error={error}
            scr={data?.tokens && data?.tokens[0] && data?.tokens[0].script_raw}
          />
        ),
      },
      script: {
        id: 'script',
        label: echo('tab-script'),
        href: routes['/token'](echoActiveId as Locales),
        component: <TokenScript data={data} loading={loading} error={error} />,
      },
      raw: {
        id: 'raw',
        label: echo('tab-raw'),
        href: routes['/token'](echoActiveId as Locales),
        component: <TokenRaw data={data} loading={loading} error={error} />,
      },
    }),
    [
      echo,
      echoActiveId,
      data,
      error,
      loading,
      holders_res.loading,
      holders_res.data,
      holders_res.error,
    ],
  );

  return (
    <Box>
      <Box>
        <Breadcrumbs tab="tokens" route="/token" />
      </Box>
      <Box>
        <NavTabs tabs={tabs} tabsDefault={tabForce} />
      </Box>
    </Box>
  );
};
