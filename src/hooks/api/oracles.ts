import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { OracleResults } from 'types/api';

export const useOracleData = (data?: OracleResults, loading?: boolean) => {
  const { echo } = useEcho();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (typeof data?.total_results === 'number' && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      {
        id: 'url',
        label: echo('url'),
        type: 'text',
        size: 11,
        showDesktop: true,
      },
      {
        id: 'content',
        label: echo('content'),
        type: 'monospace',
        size: 2,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.oracles?.map((item) => [
        item?.url,
        item?.content,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.oracles || [], [data]);

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
