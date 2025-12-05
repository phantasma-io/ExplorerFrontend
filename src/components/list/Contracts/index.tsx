import React, { useState, useCallback, useEffect } from 'react';
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

  const tableProps = useTable('cursor');
  const { limit, order_by, cursor, onPageData, resetPagination } = tableProps;

  // filter states
  const [q, qSet] = useState<ContractParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<ContractResults>(
    endpoints['/contracts']({
      limit,
      order_by,
      order_direction: 'asc',
      cursor: cursor || undefined,
      q,
    } as ContractParams),
  );

  const { cols, rows } = useContractData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.contracts?.length || 0);
  }, [data, onPageData]);

  const applySearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      searchSet(trimmed);

      if (!trimmed) {
        qSet(undefined);
        resetPagination?.();
        return;
      }

      qSet(trimmed);
      resetPagination?.();
    },
    [resetPagination],
  );

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Contracts"
        raw={data?.contracts || []}
        cols={cols}
        rows={rows}
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
