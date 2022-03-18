import React from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useNftData } from 'hooks/api';
import { NftResults } from 'types/api';
import { Table } from 'components/table';

export const NftsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  const { data } = useEmpathy<NftResults>(
    endpoints['/nfts']({
      offset,
      limit,
      order_by,
      order_direction: 'desc',
      with_total,
    }),
  );

  const { cols, rows } = useNftData(data);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Nfts"
        raw={data?.nfts || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-nft'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
