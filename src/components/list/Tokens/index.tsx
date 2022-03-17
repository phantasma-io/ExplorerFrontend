import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { TokenResults } from 'types/api';
import { Table } from 'components/table';

export const TokensList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data } = useEmpathy<TokenResults>(
    endpoints['/tokens']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'symbol',
        label: echo('symbol'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'current_supply',
        label: echo('currentSupply'),
        type: 'number',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'max_supply',
        label: echo('maxSupply'),
        type: 'number',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'burned_supply',
        label: echo('burnedSupply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'decimals',
        label: echo('decimals'),
        type: 'number',
        size: 1,
      },
      {
        id: 'fungible',
        label: echo('fungible'),
        type: 'boolean',
        size: 1,
        showDesktop: true,
      },
      {
        id: 'transferable',
        label: echo('transferable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'finite',
        label: echo('finite'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'divisible',
        label: echo('divisible'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'fuel',
        label: echo('fuel'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'stakable',
        label: echo('stakable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'fiat',
        label: echo('fiat'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'swappable',
        label: echo('swappable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'burnable',
        label: echo('burnable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'script_raw',
        label: echo('scriptRaw'),
        type: 'script',
        size: 12,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.tokens?.map((item) => [
        item?.symbol,
        item?.current_supply,
        item?.max_supply,
        item?.burned_supply,
        item?.decimals,
        item?.fungible,
        item?.transferable,
        item?.finite,
        item?.divisible,
        item?.fuel,
        item?.stakable,
        item?.fiat,
        item?.swappable,
        item?.burnable,
        item?.script_raw,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Tokens"
        raw={data?.tokens || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-token'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
