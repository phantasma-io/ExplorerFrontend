import React, { useState, useCallback, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useBlockData } from 'hooks/api';
import { BlockResults, BlockParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const BlocksList = () => {
  const { echo } = useEcho();

  // filter states
  const [q, qSet] = useState<BlockParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const tableProps = useTable('cursor');
  const {
    limit,
    order_by,
    order_direction,
    cursor,
    onPageData,
    resetPagination,
  } = tableProps;

  const { data, loading, error } = useApi<BlockResults>(
    endpoints['/blocks']({
      limit,
      order_by,
      order_direction,
      cursor: cursor || undefined,
      q,
    } as BlockParams),
  );

  const { cols, rows } = useBlockData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.blocks?.length || 0);
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
        tableId="PhantasmaExplorer-Blocks"
        raw={data?.blocks || []}
        cols={cols}
        rows={rows}
        linkOptions={{
          route: '/block',
          key: 'height',
          title: echo('explore-block'),
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
