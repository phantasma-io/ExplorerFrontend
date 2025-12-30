import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import {
  Box,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useEventData } from 'hooks/api';
import {
  EventResults,
  EventParams,
  EventKindResults,
  EventKindParams,
} from 'types/api';
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
  const [eventKindsAnchor, eventKindsAnchorSet] =
    useState<null | HTMLElement>(null);

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
    {
      revalidateOnFocus: true,
      dedupingInterval: 0,
    },
  );

  const {
    data: eventKindsData,
    loading: eventKindsLoading,
    mutate: refetchEventKinds,
    isValidating: eventKindsValidating,
  } = useApi<EventKindResults>(
    endpoints['/eventKindsWithEvents']({
      chain: 'main',
    } as EventKindParams),
    {
      revalidateOnFocus: false,
      dedupingInterval: 0,
    },
  );

  const eventKinds = useMemo(
    () =>
      (eventKindsData?.event_kinds || [])
        .map((item) => item.name)
        .filter((item): item is string => Boolean(item)),
    [eventKindsData],
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

  const openEventKinds = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!eventKindsValidating)
        void refetchEventKinds();
      eventKindsAnchorSet(event.currentTarget);
    },
    [eventKindsValidating, refetchEventKinds],
  );

  const closeEventKinds = useCallback(() => {
    eventKindsAnchorSet(null);
  }, []);

  const selectEventKind = useCallback(
    (value: string) => {
      applySearch(value);
      closeEventKinds();
    },
    [applySearch, closeEventKinds],
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
          <Box display="flex" alignItems="center" gap={1}>
            <InlineSearch
              value={search}
              onChange={searchSet}
              onSubmit={applySearch}
              placeholder={echo('search')}
            />
            <Box>
              <Tooltip title={echo('event_kind')}>
                <span>
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<FilterAltIcon fontSize="inherit" />}
                    onClick={openEventKinds}
                    disabled={eventKindsLoading}
                    sx={{ height: 40, minWidth: 48, px: 1 }}
                  >
                    {eventKindsLoading ? (
                      <CircularProgress size={16} />
                    ) : (
                      echo('event_kind_short') || echo('event_kind')
                    )}
                  </Button>
                </span>
              </Tooltip>
              <Menu
                anchorEl={eventKindsAnchor}
                open={Boolean(eventKindsAnchor)}
                onClose={closeEventKinds}
              >
                {eventKinds.length ? (
                  eventKinds.map((item) => (
                    <MenuItem key={item} onClick={() => selectEventKind(item)}>
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>{echo('no-results')}</MenuItem>
                )}
              </Menu>
            </Box>
          </Box>
        }
      />
    </Box>
  );
};
