import React, { useState, useCallback } from 'react';
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

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useApi<BlockResults>(
    endpoints['/blocks']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      q,
    } as BlockParams),
  );

  const { cols, rows, total } = useBlockData(data, loading);

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
        tableId="PhantasmaExplorer-Blocks"
        raw={data?.blocks || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-block'),
        }}
        linkOptions={{
          route: '/block',
          key: 'height',
          title: echo('explore-block'),
        }}
        withDetails={false}
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
