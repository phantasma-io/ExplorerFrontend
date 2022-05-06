import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { useSeriesData } from 'hooks/api';
import { SeriesResults, SeriesParams } from 'types/api';
import { Table } from 'components/table';
import { SeriesListFilters } from './filters';

export const SeriesList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, order_direction } = tableProps;

  // filter states
  const [name, nameSet] = useState<SeriesParams['name']>(undefined);
  const [symbol, symbolSet] = useState<SeriesParams['symbol']>(undefined);

  const { data, loading, error } = useEmpathy<SeriesResults>(
    endpoints['/series']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      name,
      symbol,
    } as SeriesParams),
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
        linkOptions={{
          route: '/series',
          key: 'id',
          title: echo('explore-series'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <SeriesListFilters
            name={name}
            nameSet={nameSet}
            symbol={symbol}
            symbolSet={symbolSet}
          />
        }
      />
    </Box>
  );
};
