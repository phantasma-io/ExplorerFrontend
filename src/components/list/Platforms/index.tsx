import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { usePlatformData } from 'hooks/api';
import { PlatformResults } from 'types/api';
import { Table } from 'components/table';

export const PlatformsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useEmpathy<PlatformResults>(
    endpoints['/platforms']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const { cols, rows, total } = usePlatformData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Platforms"
        raw={data?.platforms || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-platform'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
