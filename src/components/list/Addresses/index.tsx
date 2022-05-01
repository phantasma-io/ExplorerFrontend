import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useAddressData } from 'hooks/api';
import { AddressResults } from 'types/api';
import { Table } from 'components/table';

export const AddressesList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      with_balance: 1,
      with_stakes: 1,
      with_storage: 1,
    }),
  );

  const { cols, rows, total } = useAddressData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Addresses"
        raw={data?.addresses || []}
        cols={cols}
        rows={rows}
        total={total}
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
        loading={loading}
        error={error}
      />
    </Box>
  );
};
