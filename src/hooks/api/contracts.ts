import { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { ContractResults } from 'types/api';

export const useContractData = (data?: ContractResults) => {
  const { echo } = useEcho();

  const cols = useMemo<TableDisplayCol[]>(() => {
    if (data) {
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
    }

    return [];
  }, [echo, data]);

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
    }),
    [cols, rows],
  );

  return ctx;
};
