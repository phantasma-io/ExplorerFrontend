import React, { useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useBlockData } from 'hooks/api';
import { BlockResults } from 'types/api';
import { Table } from 'components/table';

export const BlocksList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const {
    limit,
    order_by,
    order_direction,
    orderDirectionSet,
    offset,
    with_total,
  } = tableProps;

  useEffect(() => {
    orderDirectionSet('desc');
  });

  const { data } = useEmpathy<BlockResults>(
    endpoints['/blocks']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const { cols, rows } = useBlockData(data);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Blocks"
        raw={data?.blocks || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-block'),
        }}
        linkOptions={{
          route: '/block',
          key: 'hash',
          title: echo('explore-block'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
