import React from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { usePlatformData } from 'hooks/api';
import { PlatformResults } from 'types/api';
import { Table } from 'components/table';

export const PlatformsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading } = useEmpathy<PlatformResults>(
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
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
