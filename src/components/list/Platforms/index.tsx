import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { usePlatformData } from 'hooks/api';
import { PlatformResults, PlatformParams } from 'types/api';
import { Table } from 'components/table';
import { PlatformsListFilters } from './filters';

export const PlatformsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  // filter states
  const [name, nameSet] = useState<PlatformParams['name']>(undefined);

  const { data, loading, error } = useApi<PlatformResults>(
    endpoints['/platforms']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      name,
    } as PlatformParams),
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
        linkOptions={{
          route: '/platform',
          key: 'name',
          title: echo('explore-platform'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={<PlatformsListFilters name={name} nameSet={nameSet} />}
      />
    </Box>
  );
};
