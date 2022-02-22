import React, { useEffect, useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { ExplorerRoutes, endpoints } from '../../../cfg';
import { usePageParams } from '../../../hooks';
import {
  Table,
  TableDisplayCol,
  TableDisplayRow,
  DetailSchema,
} from '../../table';

export interface AddressesListProps {
  route?: ExplorerRoutes;
}

export const AddressesList = ({ route = '/nexus' }: AddressesListProps) => {
  const { echo } = useEcho();

  const { pageParam, pageSizeParam } = usePageParams();

  const { data } = useEmpathy<AddressResults>(
    endpoints['/addresses']({
      offset: pageParam - 1,
      limit: pageSizeParam,
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

  const details = useMemo<DetailSchema>(
    () => ({
      title: `${echo('address')} ${echo('details')}`,
      action: 'close',
    }),
    [echo],
  );

  useEffect(() => {
    console.log({ data, rows });
  }, [data, rows]);

  return (
    <Box>
      <Table
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        withDetails={details}
      />
    </Box>
  );
};
