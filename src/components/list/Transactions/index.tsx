import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { TransactionResults, TransactionParams } from 'types/api';
import { Table } from 'components/table';
import { useTransactionData } from 'hooks/api';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

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
  const [blockHeight, blockHeightSet] = useState<
    TransactionParams['block_height']
  >(block);
  const [q, qSet] = useState<TransactionParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<TransactionResults>(
    endpoints['/transactions']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      address: _address,
      block_height: blockHeight,
      q,
    }),
  );

  const { cols, rows, total, withError } = useTransactionData(data, loading);

  const applySearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      searchSet(trimmed);

      if (!trimmed) {
        _addressSet(address || undefined);
        blockHeightSet(block || undefined);
        qSet(undefined);
        tableProps.pageSet(1);
        return;
      }

      qSet(trimmed);

      tableProps.pageSet(1);
    },
    [address, block, tableProps],
  );

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
        withDetails={false}
        {...tableProps}
        loading={loading}
        error={error || withError}
        addon={
          <InlineSearch
            value={search}
            onChange={searchSet}
            onSubmit={applySearch}
            placeholder={echo('search')}
          />
        }
      />
    </Box>
  );
};
