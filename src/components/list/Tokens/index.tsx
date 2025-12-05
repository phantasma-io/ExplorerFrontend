import React, { useState, useCallback, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useTokenData } from 'hooks/api';
import { TokenResults, TokenParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const TokensList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, onPageData } = tableProps;

  // filter states
  const [q, qSet] = useState<TokenParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<TokenResults>(
    endpoints['/tokens']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      with_logo: 1,
      with_price: 1,
      q,
    } as TokenParams),
  );

  const { cols, rows, total } = useTokenData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.tokens?.length || 0);
  }, [data, onPageData]);

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
        tableId="PhantasmaExplorer-Tokens"
        raw={data?.tokens || []}
        cols={cols}
        rows={rows}
        total={total}
        linkOptions={{
          route: '/token',
          key: 'symbol',
          title: echo('explore-token'),
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
