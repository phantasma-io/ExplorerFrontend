import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useSeriesData } from 'hooks/api';
import { SeriesResults } from 'types/api';
import { Table } from 'components/table';

export const SeriesList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, order_direction } = tableProps;

  const { data, loading, error } = useEmpathy<SeriesResults>(
    endpoints['/series']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const { cols, rows, total } = useSeriesData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Series"
        raw={data?.series || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-series'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
