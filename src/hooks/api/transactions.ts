import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { TransactionResults } from 'types/api';
import { unixmsToDate } from 'scripts';

export const useTransactionData = (
  data?: TransactionResults,
  loading?: boolean,
) => {
  const { echo } = useEcho();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (data?.total_results && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      {
        id: 'hash',
        label: echo('hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/transaction',
          key: 'hash',
          title: echo('explore-transaction'),
          primary: true,
        },
      },
      {
        id: 'block_hash',
        label: echo('block_hash'),
        type: 'number',
        size: 2,
        linkOptions: {
          route: '/block',
          key: 'block_hash',
          title: echo('explore-block'),
        },
      },
      {
        id: 'block_height',
        label: echo('block_height'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.transactions?.map((item) => [
        item?.hash,
        item?.block_hash,
        item?.block_height,
        item?.date ? unixmsToDate(item.date) : undefined,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.transactions || [], [data]);

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
