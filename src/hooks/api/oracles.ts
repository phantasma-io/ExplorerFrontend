import { useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { OracleResults } from 'types/api';

export const useOracleData = (data?: OracleResults, loading?: boolean) => {
  const { echo } = useEcho();
  const total = data?.total_results ?? 0;

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
      raw,
      total,
    }),
    [cols, rows, raw, total],
  );

  return ctx;
};
