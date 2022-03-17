import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { SeriesResults } from 'types/api';
import { Table } from 'components/table';

export const SeriesList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  const { data } = useEmpathy<SeriesResults>(
    endpoints['/series']({
      offset,
      limit,
      order_by,
      order_direction: 'desc',
      with_total,
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 5,
        showDesktop: true,
      },
      {
        id: 'current_supply',
        label: echo('current_supply'),
        type: 'number',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'max_supply',
        label: echo('max_supply'),
        type: 'number',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'description',
        label: echo('description'),
        type: 'text',
        size: 5,
      },
      {
        id: 'creator',
        label: echo('creator'),
        type: 'monospace',
        size: 5,
      },
      {
        id: 'image',
        label: echo('image'),
        type: 'monospace',
        size: 5,
      },
      {
        id: 'mode_name',
        label: echo('mode_name'),
        type: 'text',
        size: 5,
      },
      {
        id: 'type',
        label: echo('type'),
        type: 'text',
        size: 5,
      },
      {
        id: 'royalties',
        label: echo('royalties'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrType1',
        label: echo('attrType1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrValue1',
        label: echo('attrValue1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrType2',
        label: echo('attrType2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrValue2',
        label: echo('attrValue2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrType3',
        label: echo('attrType3'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attrValue3',
        label: echo('attrValue3'),
        type: 'text',
        size: 5,
      },
    ],
    [echo],
  );

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.series?.map((item) => [
        item?.name,
        item?.current_supply,
        item?.max_supply,
        item?.description,
        item?.creator,
        item?.image,
        item?.mode_name,
        item?.type,
        item?.royalties,
        item?.attrType1,
        item?.attrValue1,
        item?.attrType2,
        item?.attrValue2,
        item?.attrType3,
        item?.attrValue3,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Series"
        raw={data?.series || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-series'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
