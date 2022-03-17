import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
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

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'event_kind',
        label: echo('event_kind'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'transaction_hash',
        label: echo('transaction_hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        // linkOptions: {
        //   route: '/transaction',
        //   key: 'transaction_hash',
        //   title: echo('explore-transaction'),
        // },
      },
      {
        id: 'address',
        label: echo('address'),
        type: 'monospace',
        size: 3,
        // linkOptions: {
        //   route: '/address',
        //   key: 'address',
        //   title: echo('explore-address'),
        // },
      },
      {
        id: 'address_name',
        label: echo('address_name'),
        type: 'text',
        size: 3,
      },
      {
        id: 'chain',
        label: echo('chain'),
        type: 'text',
        size: 3,
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.events?.map((item) => [
        item?.event_kind,
        item?.transaction_hash,
        item?.address,
        item?.address_name,
        item?.chain,
        item?.date ? new Date(parseInt(item.date, 10) * 1000) : undefined,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

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
