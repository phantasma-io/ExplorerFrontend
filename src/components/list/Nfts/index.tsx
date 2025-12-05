import React, { useState, useCallback, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useNftData } from 'hooks/api';
import { NftResults, NftParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const NftsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable('cursor');
  const {
    limit,
    order_by,
    order_direction,
    cursor,
    onPageData,
    resetPagination,
  } = tableProps;

  // filter states
  const [q, qSet] = useState<NftParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<NftResults>(
    endpoints['/nfts']({
      limit,
      order_by,
      order_direction,
      cursor: cursor || undefined,
      q,
    } as NftParams),
  );

  const { cols, rows, total } = useNftData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.nfts?.length || 0);
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
        tableId="PhantasmaExplorer-Nfts"
        raw={data?.nfts || []}
        cols={cols}
        rows={rows}
        total={total}
        linkOptions={{
          route: '/nft',
          key: 'token_id',
          title: echo('explore-nft'),
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
