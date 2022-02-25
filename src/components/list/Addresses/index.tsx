import React, { useState, useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS, TABLE_ORDERBY, TABLE_ORDERDIR } from 'cfg';
import { useTableParams } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { Table } from 'components/table';

export const AddressesList = () => {
  const { echo } = useEcho();

  const tableParams = useTableParams();

  const [page, pageSet] = useState(tableParams.page);
  const [pageSize, pageSizeSet] = useState(tableParams.pageSize);

  const { data } = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      offset: (page - 1) * pageSize,
      limit: pageSize,
      with_total: 1,
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
        page={page}
        pageSet={pageSet}
        pageSize={pageSize}
        pageSizeSet={pageSizeSet}
        orderBy={TABLE_ORDERBY}
        orderBySet={() => undefined}
        orderDirection={TABLE_ORDERDIR}
        orderDirectionSet={() => undefined}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
