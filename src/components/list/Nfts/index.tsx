import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { useNftData } from 'hooks/api';
import { NftResults } from 'types/api';
import { Table } from 'components/table';

export const NftsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, order_direction } = tableProps;

  const { data, loading, error } = useEmpathy<NftResults>(
    endpoints['/nfts']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const { cols, rows, total } = useNftData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Nfts"
        raw={data?.nfts || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-nft'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
