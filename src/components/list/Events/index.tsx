import React, { useState, useCallback, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useEventData } from 'hooks/api';
import { EventResults, EventParams } from 'types/api';
import { Table } from 'components/table';
import { InlineSearch } from 'components/table/Controls/InlineSearch';

export interface EventsListProps {
  address?: string;
  block?: string;
  transaction?: string;
}

export const EventsList = ({
  address,
  block,
  transaction,
}: EventsListProps) => {
  const { echo } = useEcho();

  const tableProps = useTable('cursor');
  const {
    limit,
    cursor,
    onPageData,
    resetPagination,
    order_direction,
  } = tableProps;

  // filter states
  const [_address, _addressSet] = useState<EventParams['address']>(
    address || undefined,
  );
  const [q, qSet] = useState<EventParams['q']>(undefined);
  const [search, searchSet] = useState<string>('');

  const { data, loading, error } = useApi<EventResults>(
    endpoints['/events']({
      limit,
      order_by: 'date',
      order_direction,
      cursor: cursor || undefined,
      chain: 'main',
      address: _address,
      block_height: block,
      transaction_hash: transaction,
      with_event_data: 1,
      with_fiat: 1,
      q,
    } as EventParams),
  );

  const { cols, rows, total, withError } = useEventData(data, loading);

  useEffect(() => {
    onPageData?.(data?.next_cursor ?? null, data?.events?.length || 0);
  }, [data, onPageData]);

  const applySearch = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      searchSet(trimmed);

      if (!trimmed) {
        _addressSet(address || undefined);
        qSet(undefined);
        resetPagination?.();
        return;
      }

      qSet(trimmed);
      resetPagination?.();
    },
    [address, resetPagination],
  );

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Events"
        raw={data?.events || []}
        cols={cols}
        rows={rows}
        linkOptions={{
          route: '/event',
          key: 'event_id',
          title: echo('explore-event'),
        }}
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
