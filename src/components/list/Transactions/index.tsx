import React, { useMemo, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { TransactionResults } from 'types/api';
import { Table } from 'components/table';

export const TransactionsList = () => {
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

  const { data } = useEmpathy<TransactionResults>(
    endpoints['/transactions']({
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
        cell: 'text',
        size: 8,
        showDesktop: true,
      },
      {
        id: 'blockHeight',
        label: echo('blockHeight'),
        cell: 'number',
        size: 3,
        showDesktop: true,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.transactions?.map((item) => [
        item?.hash,
        item?.blockHeight,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Transactions"
        raw={data?.transactions || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
