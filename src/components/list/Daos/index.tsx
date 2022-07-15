import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { useDaoData } from 'hooks/api';
import { DaoResults, DaoParams } from 'types/api';
import { Table } from 'components/table';
import { DaosListFilters } from './filters';

export const DaosList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  // filter states
  const [organization_name, organization_nameSet] =
    useState<DaoParams['organization_name']>(undefined);
  const [organization_name_partial, organization_name_partialSet] =
    useState<DaoParams['organization_name_partial']>(undefined);

  const { data, loading, error } = useEmpathy<DaoResults>(
    endpoints['/organizations']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      organization_name,
      organization_name_partial,
    } as DaoParams),
  );

  const { cols, rows, total } = useDaoData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Daos"
        raw={data?.organizations || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-dao'),
        }}
        linkOptions={{
          route: '/dao',
          key: 'name',
          title: echo('explore-dao'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <DaosListFilters
            organization_name={organization_name}
            organization_nameSet={organization_nameSet}
            organization_name_partial={organization_name_partial}
            organization_name_partialSet={organization_name_partialSet}
          />
        }
      />
    </Box>
  );
};
