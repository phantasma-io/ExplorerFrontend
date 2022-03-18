import React from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useEventData } from 'hooks/api';
import { EventResults } from 'types/api';
import { Table } from 'components/table';

export const EventsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, offset, with_total } = tableProps;

  const { data } = useEmpathy<EventResults>(
    endpoints['/events']({
      offset,
      limit,
      order_by: 'date',
      order_direction: 'desc',
      with_total,
    }),
  );

  const { cols, rows } = useEventData(data);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Events"
        raw={data?.events || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-event'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
