import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { ChainResults } from 'types/api';
import { Table } from 'components/table';

export const ChainsList = () => {
  const { t } = useI18n();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data } = useApi<ChainResults>(
    endpoints['/chains']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'chain_name',
        label: t('chain'),
        type: 'text',
        size: 8,
        showDesktop: true,
      },
      {
        id: 'chain_height',
        label: t('height'),
        type: 'number',
        size: 3,
        showDesktop: true,
      },
    ],
    [t],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.chains?.map((item) => [
        item?.chain_name,
        item?.chain_height,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Chains"
        raw={data?.chains || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        {...tableProps}
      />
    </Box>
  );
};
