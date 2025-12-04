import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { TransactionResults } from 'types/api';
import { decodeBase16 } from 'scripts/decodeBase16';
import { unixToDate } from 'scripts';

export const useTransactionData = (
  data?: TransactionResults,
  loading?: boolean,
) => {
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
        id: 'hash',
        label: t('hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/transaction',
          key: 'hash',
          title: t('explore-transaction'),
          primary: true,
        },
      },
      {
        id: 'state',
        label: t('state'),
        type: 'text',
        size: 2
      },
      {
        id: 'block_height',
        label: t('block_height'),
        type: 'text',
        size: 2,
        showDesktop: true,
        linkOptions: {
          route: '/block',
          key: 'block_height',
          title: t('explore-block'),
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
        id: 'result',
        label: t('result'),
        type: 'monospace',
        size: 2,
      },
      {
        id: 'payload',
        label: t('payload'),
        type: 'text',
        size: 2,
      },
      {
        id: 'fee',
        label: t('fee'),
        type: 'text',
        size: 2,
        append: ' KCAL',
      },
    ];
  }, [t]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.transactions?.map((item) => [
        item?.hash,
        item?.state === 'Halt' ? 'Successful' : item?.state,
        item?.block_height,
        item?.date ? unixToDate(item.date) : undefined,
        item?.result,
        item?.payload ? decodeBase16(item?.payload) : null,
        item?.fee,
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
