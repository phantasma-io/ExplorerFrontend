import React, { useState } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useBlockData } from 'hooks/api';
import { BlockResults, BlockParams } from 'types/api';
import { Table } from 'components/table';
import { BlocksListFilters } from './filters';

export const BlocksList = () => {
  const { echo } = useEcho();

  // filter states
  const [hash, hashSet] = useState<BlockParams['hash']>(undefined);
  const [hash_partial, hash_partialSet] =
    useState<BlockParams['hash_partial']>(undefined);
  const [height, heightSet] = useState<BlockParams['height']>(undefined);

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useApi<BlockResults>(
    endpoints['/blocks']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      hash,
      hash_partial,
      height,
    } as BlockParams),
  );

  const { cols, rows, total } = useBlockData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Blocks"
        raw={data?.blocks || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-block'),
        }}
        linkOptions={{
          route: '/block',
          key: 'height',
          title: echo('explore-block'),
        }}
        withDetails={false}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <BlocksListFilters
            hash={hash}
            hashSet={hashSet}
            hash_partial={hash_partial}
            hash_partialSet={hash_partialSet}
            height={height}
            heightSet={heightSet}
          />
        }
      />
    </Box>
  );
};
