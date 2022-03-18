import { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { TransactionResults } from 'types/api';

export const useTransactionData = (data?: TransactionResults) => {
  const { echo } = useEcho();

  const cols = useMemo<TableDisplayCol[]>(() => {
    if (data) {
      return [
        {
          id: 'hash',
          label: echo('hash'),
          type: 'monospace',
          size: 8,
          showDesktop: true,
        },
        {
          id: 'blockHeight',
          label: echo('blockHeight'),
          type: 'number',
          size: 3,
          showDesktop: true,
        },
      ];
    }

    return [];
  }, [echo, data]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.transactions?.map((item) => [
        item?.hash,
        item?.blockHeight,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
    }),
    [cols, rows],
  );

  return ctx;
};
