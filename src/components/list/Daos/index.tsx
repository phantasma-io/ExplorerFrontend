import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useDaoData } from 'hooks/api';
import { DaoResults, DaoParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export const DaosList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  // filter states
  const [q, qSet] = useState<DaoParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<DaoResults>(
    endpoints['/organizations']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      q,
      with_creation_event: 1,
      with_address: 1,
    } as DaoParams),
  );

  const { cols, rows, total } = useDaoData(data, loading);

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
        tableId="PhantasmaExplorer-Daos"
        raw={data?.organizations || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-dao'),
        }}
        linkOptions={{
          route: '/dao',
          key: 'name',
          title: echo('explore-dao'),
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
