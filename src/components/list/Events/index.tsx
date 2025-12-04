import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { useEventData } from 'hooks/api';
import { EventResults, EventParams } from 'types/api';
import { Table } from 'components/table';
import { EventsListFilters } from './filters';

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
  const { t } = useI18n();

  const tableProps = useTable();
  const { limit, offset, with_total, order_direction } = tableProps;

  // filter states
  const [_address, _addressSet] = useState<EventParams['address']>(
    address || undefined,
  );
  const [address_partial, address_partialSet] =
    useState<EventParams['address_partial']>(undefined);

  const { data, loading, error } = useApi<EventResults>(
    endpoints['/events']({
      offset,
      limit,
      order_by: 'date',
      order_direction,
      with_total,
      chain: 'main',
      address: _address,
      address_partial,
      block_height: block,
      transaction_hash: transaction,
      with_event_data: 1,
      with_fiat: 1,
    } as EventParams),
  );

  const { cols, rows, total, withError } = useEventData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Events"
        raw={data?.events || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: t('details-event'),
        }}
        linkOptions={{
          route: '/event',
          key: 'event_id',
          title: t('explore-event'),
        }}
        {...tableProps}
        loading={loading}
        error={error || withError}
        addon={
          <EventsListFilters
            address={_address}
            addressSet={_addressSet}
            address_partial={address_partial}
            address_partialSet={address_partialSet}
            address_disable={!!address}
          />
        }
      />
    </Box>
  );
};
