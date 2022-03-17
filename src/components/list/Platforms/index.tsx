import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { PlatformResults } from 'types/api';
import { Table } from 'components/table';

export const PlatformsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data } = useEmpathy<PlatformResults>(
    endpoints['/platforms']({
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
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'fuel',
        label: echo('fuel'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'chain',
        label: echo('chain'),
        type: 'monospace',
        size: 5,
        showDesktop: true,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.platforms?.map((item) => [
        item?.name,
        item?.fuel,
        item?.chain,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Platforms"
        raw={data?.platforms || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-platform'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
