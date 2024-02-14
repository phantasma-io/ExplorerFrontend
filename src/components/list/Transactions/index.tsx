import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { TransactionResults, TransactionParams } from 'types/api';
import { Table } from 'components/table';
import { useTransactionData } from 'hooks/api';
import { TransactionsListFilters } from './filters';

export interface TransactionsListProps {
  address?: string;
  block?: string;
}

export const TransactionsList = ({ address, block }: TransactionsListProps) => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  // filter states
  const [_address, _addressSet] = useState<TransactionParams['address']>(
    address || undefined,
  );

  const { data, loading, error } = useEmpathy<TransactionResults>(
    endpoints['/transactions']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      address: _address,
      block_height: block,
    }),
  );

  const { cols, rows, total, withError } = useTransactionData(data, loading);

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
        linkOptions={{
          route: '/transaction',
          key: 'hash',
          title: echo('explore-transaction'),
        }}
        {...tableProps}
        loading={loading}
        error={error || withError}
        addon={
          <TransactionsListFilters
            address={_address}
            addressSet={_addressSet}
            address_disable={!!address}
          />
        }
      />
    </Box>
  );
};
