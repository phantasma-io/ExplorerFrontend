import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
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
        type: 'monospace',
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
        id: 'result',
        label: echo('result'),
        type: 'monospace',
        size: 2,
      },
      {
        id: 'payload',
        label: echo('payload'),
        type: 'monospace',
        size: 2,
      },
      {
        id: 'fee',
        label: echo('fee'),
        type: 'text',
        size: 2,
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'expiration',
        label: echo('expiration'),
        type: 'date',
        size: 2,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.transactions?.map((item) => [
        item?.hash,
        item?.block_hash,
        item?.block_height,
        item?.result,
        item?.payload,
        item?.fee,
        item?.date ? unixmsToDate(item.date) : undefined,
        item?.expiration ? unixmsToDate(item.expiration) : undefined,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.transactions || [], [data]);

  const withError = useMemo(() => {
    if (data?.error) {
      return true;
    }
    return false;
  }, [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      total,
      raw,
      withError,
    }),
    [cols, rows, total, raw, withError],
  );

  return ctx;
};
