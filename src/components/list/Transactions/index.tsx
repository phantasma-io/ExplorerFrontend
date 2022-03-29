import React, { useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TransactionResults } from 'types/api';
import { Table } from 'components/table';
import { useTransactionData } from 'hooks/api';

export interface TransactionsListProps {
  address?: string;
}

export const TransactionsList = ({ address }: TransactionsListProps) => {
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

  const { data, loading, error } = useEmpathy<TransactionResults>(
    endpoints['/transactions']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      address,
    }),
  );

  const { cols, rows, total } = useTransactionData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Transactions"
        raw={data?.transactions || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-transaction'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
