import React, { useMemo, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { BlockResults } from 'types/api';
import { Table } from 'components/table';

export const BlocksList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const {
    limit,
    order_by,
    order_direction,
    orderDirectionSet,
    offset,
    with_total,
  } = tableProps;

  useEffect(() => {
    orderDirectionSet('desc');
  });

  const { data } = useEmpathy<BlockResults>(
    endpoints['/blocks']({
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
        id: 'hash',
        label: echo('hash'),
        type: 'monospace',
        size: 8,
        showDesktop: true,
        linkOptions: {
          route: '/block',
          key: 'hash',
          title: echo('explore-block'),
        },
      },
      {
        id: 'height',
        label: echo('height'),
        type: 'number',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'previous_hash',
        label: echo('prevHash'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/block',
          key: 'previous_hash',
          title: echo('explore-block'),
        },
      },
      {
        id: 'protocol',
        label: echo('protocol'),
        type: 'number',
        size: 1,
      },
      {
        id: 'chain_address',
        label: echo('chainAddress'),
        type: 'monospace',
        size: 12,
      },
      {
        id: 'validator_address',
        label: echo('validatorAddress'),
        type: 'monospace',
        size: 12,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.blocks?.map((item) => [
        item?.hash,
        item?.height,
        item?.previous_hash,
        item?.protocol,
        item?.chain_address,
        item?.validator_address,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Blocks"
        raw={data?.blocks || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-block'),
        }}
        linkOptions={{
          route: '/block',
          key: 'hash',
          title: echo('explore-block'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
