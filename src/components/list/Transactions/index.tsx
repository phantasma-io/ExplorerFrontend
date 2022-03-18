import React, { useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TransactionResults } from 'types/api';
import { Table } from 'components/table';
import { useTransactionData } from 'hooks/api';

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

  const { cols, rows } = useTransactionData(data);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Transactions"
        raw={data?.transactions || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-transaction'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
