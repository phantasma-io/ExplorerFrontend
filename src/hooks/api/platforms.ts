import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { PlatformResults } from 'types/api';

export const usePlatformData = (data?: PlatformResults, loading?: boolean) => {
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
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 3,
        showDesktop: true,
        linkOptions: {
          route: '/platform',
          key: 'platform',
          title: echo('explore-platform'),
          primary: true,
        },
      },
      {
        id: 'fuel',
        label: echo('fuel'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'chain',
        label: echo('chain'),
        type: 'monospace',
        size: 5,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.platforms?.map((item) => [
        item?.name,
        item?.fuel,
        item?.chain,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.platforms || [], [data]);

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
