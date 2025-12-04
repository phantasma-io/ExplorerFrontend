import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { SeriesResults } from 'types/api';

export const useSeriesData = (data?: SeriesResults, loading?: boolean) => {
  const { t } = useI18n();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (typeof data?.total_results === 'number' && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // thumb
      {
        id: 'thumbnail',
        label: t('image'),
        type: 'thumbnail',
        size: 2,
      },
      {
        id: 'name',
        label: t('name'),
        type: 'text',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'current_supply',
        label: t('current_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'max_supply',
        label: t('max_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'description',
        label: t('description'),
        type: 'text',
        size: 5,
      },
      {
        id: 'creator',
        label: t('creator'),
        type: 'monospace',
        size: 1,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'image',
        label: t('image'),
        type: 'monospace',
        size: 5,
      },
      {
        id: 'mode_name',
        label: t('mode_name'),
        type: 'text',
        size: 5,
      },
      {
        id: 'type',
        label: t('type'),
        type: 'text',
        size: 1,
        showDesktop: true,
      },
      {
        id: 'royalties',
        label: t('royalties'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_type_1',
        label: t('attr_type_1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_1',
        label: t('attr_value_1'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'attr_type_2',
        label: t('attr_type_2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_2',
        label: t('attr_value_2'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'attr_type_3',
        label: t('attr_type_3'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_3',
        label: t('attr_value_3'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [t]);

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

  const raw = useMemo(() => data?.series || [], [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      raw,
      total,
    }),
    [cols, rows, raw, total],
  );

  return ctx;
};
