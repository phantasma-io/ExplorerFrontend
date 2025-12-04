import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { BlockResults } from 'types/api';
import { unixToDate } from 'scripts';

export const useBlockData = (data?: BlockResults, loading?: boolean) => {
  const { t } = useI18n();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (typeof data?.total_results === 'number' && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      {
        id: 'height',
        label: t('height'),
        type: 'text',
        size: 2,
        showDesktop: true,
        linkOptions: {
          route: '/block',
          key: 'height',
          title: t('explore-block'),
          primary: true,
        },
      },
      {
        id: 'date',
        label: t('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'protocol',
        label: t('protocol'),
        type: 'number',
        size: 1,
      },
      {
        id: 'reward',
        label: t('reward'),
        type: 'text',
        size: 1,
      },
      {
        id: 'chain_address',
        label: t('chainAddress'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/address',
          key: 'chain_address',
          title: t('explore-address'),
        },
      },
      {
        id: 'validator_address',
        label: t('validatorAddress'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/address',
          key: 'validator_address',
          title: t('explore-address'),
        },
      },
      {
        id: 'hash',
        label: t('hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true
      },
      {
        id: 'previous_hash',
        label: t('prevHash'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/block',
          key: 'previous_hash',
          title: t('explore-block'),
        },
      },
    ];
  }, [t]);

  const rows: TableDisplayRow[] = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.blocks?.map((item) => [
        item?.height,
        item?.date ? unixToDate(item.date) : undefined,
        item?.protocol,
        item?.reward,
        item?.chain_address,
        item?.validator_address,
        item?.hash,
        item?.previous_hash,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.blocks || [], [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      total,
      raw,
    }),
    [cols, rows, total, raw],
  );

  return ctx;
};
