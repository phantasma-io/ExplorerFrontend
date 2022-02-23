import React, { useState, useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints } from '../../../cfg';
import { usePageParams } from '../../../hooks';
import { Table } from '../../table';
import { TableDisplayCol, TableDisplayRow } from '../../../types/table';

export const AddressesList = () => {
  const { echo } = useEcho();

  const { pageParam, pageSizeParam } = usePageParams();

  const [page, pageSet] = useState(pageParam);
  const [pageSize, pageSizeSet] = useState(pageSizeParam);

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
      },
      {
        id: 'name',
        label: echo('name'),
        cell: 'text',
        size: 4,
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
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        page={page}
        pageSet={pageSet}
        pageSize={pageSize}
        pageSizeSet={pageSizeSet}
      />
    </Box>
  );
};
