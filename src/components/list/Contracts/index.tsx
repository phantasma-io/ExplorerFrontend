import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useContractData } from 'hooks/api';
import { ContractResults, ContractParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const ContractsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  // filter states
  const [q, qSet] = useState<ContractParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<ContractResults>(
    endpoints['/contracts']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      q,
    } as ContractParams),
  );

  const { cols, rows, total } = useContractData(data, loading);

  const applySearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      searchSet(trimmed);

      if (!trimmed) {
        qSet(undefined);
        tableProps.pageSet(1);
        return;
      }

      qSet(trimmed);
      tableProps.pageSet(1);
    },
    [tableProps],
  );

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Contracts"
        raw={data?.contracts || []}
        cols={cols}
        rows={rows}
        total={total}
        linkOptions={{
          route: '/contract',
          key: 'name',
          title: echo('explore-contract'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
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
