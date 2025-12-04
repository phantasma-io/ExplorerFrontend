import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { usePlatformData } from 'hooks/api';
import { PlatformResults, PlatformParams } from 'types/api';
import { Table } from 'components/table';
import { PlatformsListFilters } from './filters';

export const PlatformsList = () => {
  const { t } = useI18n();

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
          title: t('details-platform'),
        }}
        linkOptions={{
          route: '/platform',
          key: 'name',
          title: t('explore-platform'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={<PlatformsListFilters name={name} nameSet={nameSet} />}
      />
    </Box>
  );
};
