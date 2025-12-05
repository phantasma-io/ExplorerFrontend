import { useMemo, useState, useEffect } from 'react';
import { useEcho } from 'hooks/useEcho';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { ContractResults } from 'types/api';

export const useContractData = (data?: ContractResults, loading?: boolean) => {
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
        linkOptions: {
          route: '/contract',
          key: 'symbol',
          title: echo('explore-contract'),
          primary: true,
        },
      },
      {
        id: 'address',
        label: echo('address'),
        type: 'text',
        size: 3,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        },
      },
      {
        id: 'address_name',
        label: echo('address_name'),
        type: 'text',
        size: 3,
      },
      {
        id: 'token',
        label: echo('token'),
        type: 'text',
        size: 3,
        linkOptions: {
          route: '/token',
          key: 'token',
          title: echo('explore-token'),
        },
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.contracts?.map((item) => [
        item?.name,
        item?.hash,
        item?.symbol,
        item?.address?.address,
        item?.address?.address_name,
        item?.token?.symbol,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.contracts || [], [data]);

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
