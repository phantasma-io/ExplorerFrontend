import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { unixmsToDate } from 'scripts';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { EventResults } from 'types/api';

export const useEventData = (data?: EventResults, loading?: boolean) => {
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
        id: 'event_kind',
        label: echo('event_kind'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'transaction_hash',
        label: echo('transaction_hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/transaction',
          key: 'transaction_hash',
          title: echo('explore-transaction'),
        },
      },
      {
        id: 'address',
        label: echo('address'),
        type: 'monospace',
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
        id: 'chain',
        label: echo('chain'),
        type: 'text',
        size: 3,
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.events?.map((item) => [
        item?.event_kind,
        item?.transaction_hash,
        item?.address,
        item?.address_name,
        item?.chain,
        item?.date ? unixmsToDate(item.date) : undefined,
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
