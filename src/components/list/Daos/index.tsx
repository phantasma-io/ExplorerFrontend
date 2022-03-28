import React from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useDaoData } from 'hooks/api';
import { DaoResults } from 'types/api';
import { Table } from 'components/table';

export const DaosList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useEmpathy<DaoResults>(
    endpoints['/organizations']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
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
        {...tableProps}
        filters={TABLE_FILTERS}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
