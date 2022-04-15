import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { SeriesResults } from 'types/api';

export const useSeriesData = (data?: SeriesResults, loading?: boolean) => {
  const { echo } = useEcho();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (data?.total_results && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // thumb
      {
        id: 'thumbnail',
        label: echo('image'),
        type: 'thumbnail',
        size: 2,
      },
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'current_supply',
        label: echo('current_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'max_supply',
        label: echo('max_supply'),
        type: 'number',
        size: 3,
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
        size: 1,
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
        size: 1,
        showDesktop: true,
      },
      {
        id: 'royalties',
        label: echo('royalties'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_type_1',
        label: echo('attr_type_1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_1',
        label: echo('attr_value_1'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'attr_type_2',
        label: echo('attr_type_2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_2',
        label: echo('attr_value_2'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'attr_type_3',
        label: echo('attr_type_3'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_3',
        label: echo('attr_value_3'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.series?.map((item) => [
        item?.image,
        item?.name,
        item?.current_supply,
        item?.max_supply,
        item?.description,
        item?.creator,
        item?.image,
        item?.mode_name,
        item?.type,
        item?.royalties,
        item?.attr_type_1,
        item?.attr_value_1,
        item?.attr_type_2,
        item?.attr_value_2,
        item?.attr_type_3,
        item?.attr_value_3,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      total,
    }),
    [cols, rows, total],
  );

  return ctx;
};
