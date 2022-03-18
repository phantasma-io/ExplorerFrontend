import { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { PlatformResults } from 'types/api';

export const usePlatformData = (data?: PlatformResults) => {
  const { echo } = useEcho();

  const cols = useMemo<TableDisplayCol[]>(() => {
    if (data) {
      return [
        {
          id: 'name',
          label: echo('name'),
          type: 'text',
          size: 3,
          showDesktop: true,
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
    }

    return [];
  }, [echo, data]);

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

  const ctx = useMemo(
    () => ({
      cols,
      rows,
    }),
    [cols, rows],
  );

  return ctx;
};
