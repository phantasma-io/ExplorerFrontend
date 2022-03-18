import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { AddressResults } from 'types/api';
import { Table } from 'components/table';

export const AddressesList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data } = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      with_balance: 0,
      with_stakes: 0,
      with_storage: 0,
      with_transactions: 0,
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'address',
        label: echo('address'),
        type: 'monospace',
        size: 8,
        showDesktop: true,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        },
      },
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'stake',
        label: echo('stake'),
        type: 'number',
        size: 10,
      },
      {
        id: 'unclaimed',
        label: echo('unclaimed'),
        type: 'number',
        size: 10,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.addresses?.map((item) => [
        item?.address,
        item?.address_name,
        item?.stake,
        item?.unclaimed,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Addresses"
        raw={data?.addresses || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-address'),
        }}
        linkOptions={{
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
