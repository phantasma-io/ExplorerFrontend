import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { ContractResults } from 'types/api';

export const useContractData = (data?: ContractResults, loading?: boolean) => {
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
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 5,
        showDesktop: true,
      },
      {
        id: 'hash',
        label: echo('hash'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'symbol',
        label: echo('symbol'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.contracts?.map((item) => [
        item?.name,
        item?.hash,
        item?.symbol,
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
