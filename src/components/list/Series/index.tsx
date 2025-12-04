import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { useSeriesData } from 'hooks/api';
import { SeriesResults, SeriesParams } from 'types/api';
import { Table } from 'components/table';
import { SeriesListFilters } from './filters';

export const SeriesList = () => {
  const { t } = useI18n();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, order_direction } = tableProps;

  // filter states
  const [name, nameSet] = useState<SeriesParams['name']>(undefined);
  const [symbol, symbolSet] = useState<SeriesParams['symbol']>(undefined);

  const { data, loading, error } = useApi<SeriesResults>(
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
          title: t('details-series'),
        }}
        linkOptions={{
          route: '/series',
          key: 'id',
          title: t('explore-series'),
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
