import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useEventData } from 'hooks/api';
import { EventResults } from 'types/api';
import { Table } from 'components/table';

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

  const tableProps = useTable();
  const { limit, offset, with_total, order_direction } = tableProps;

  const { data, loading, error } = useEmpathy<EventResults>(
    endpoints['/events']({
      offset,
      limit,
      order_by: 'date',
      order_direction,
      with_total,
      chain: 'main',
      address,
      block_hash: block,
      transaction_hash: transaction,
      with_event_data: 1,
      with_fiat: 1,
    }),
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
          title: echo('details-event'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
        loading={loading}
        error={error || withError}
      />
    </Box>
  );
};
