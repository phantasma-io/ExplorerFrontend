import React, { useState, useCallback, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useSeriesData } from 'hooks/api';
import { SeriesResults, SeriesParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const SeriesList = () => {
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
  const [q, qSet] = useState<SeriesParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<SeriesResults>(
    endpoints['/series']({
      limit,
      order_by,
      order_direction,
      cursor: cursor || undefined,
      q,
    } as SeriesParams),
  );

  const { cols, rows, total } = useSeriesData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.series?.length || 0);
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
        tableId="PhantasmaExplorer-Series"
        raw={data?.series || []}
        cols={cols}
        rows={rows}
        total={total}
        linkOptions={{
          route: '/series',
          key: 'id',
          title: echo('explore-series'),
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
