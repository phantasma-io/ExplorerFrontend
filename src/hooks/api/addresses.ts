import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { AddressResults } from 'types/api';

export const useAddressData = (data?: AddressResults, loading?: boolean) => {
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
        id: 'address',
        label: echo('address'),
        type: 'monospace',
        size: 8,
        showDesktop: true,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
          primary: true,
        },
      },
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'stake',
        label: echo('stake'),
        type: 'number',
        size: 10,
      },
      {
        id: 'unclaimed',
        label: echo('unclaimed'),
        type: 'number',
        size: 10,
      },
      {
        id: 'storage-available',
        label: echo('storage-available'),
        type: 'number',
        size: 10,
      },
      {
        id: 'storage-used',
        label: echo('used'),
        type: 'number',
        size: 10,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.addresses?.map((item) => [
        item?.address,
        item?.address_name,
        item?.stake,
        item?.unclaimed,
        item?.storage?.available,
        item?.storage?.used,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.addresses || [], [data]);

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
