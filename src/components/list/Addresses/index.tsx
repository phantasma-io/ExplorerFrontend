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
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'address',
        label: echo('address'),
        cell: 'text',
        size: 8,
        showDesktop: true,
      },
      {
        id: 'name',
        label: echo('name'),
        cell: 'text',
        size: 3,
        showDesktop: true,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.addresses?.map((item) => [
        item?.address,
        item?.address_name,
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
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
