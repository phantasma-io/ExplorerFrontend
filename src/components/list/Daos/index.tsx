import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
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
        loading={loading}
        error={error}
      />
    </Box>
  );
};
