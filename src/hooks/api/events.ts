import { useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import { unixToDate } from 'scripts';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { EventResults } from 'types/api';

export const useEventData = (data?: EventResults, loading?: boolean) => {
  const { echo } = useEcho();
  const total = data?.total_results ?? 0;

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
        id: 'block_hash',
        label: echo('block_hash'),
        type: 'monospace',
        size: 7,
        linkOptions: {
          route: '/block',
          key: 'block_hash',
          title: echo('explore-block'),
        },
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
        id: 'chain',
        label: echo('chain'),
        type: 'text',
        size: 3,
      },
      {
        id: 'contract',
        label: echo('contract'),
        type: 'text',
        size: 3,
        linkOptions: {
          route: '/contract',
          key: 'contract',
          title: echo('explore-contract'),
        },
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'date_unix',
        label: `${echo('date')} (unix)`,
        type: 'monospace',
        size: 2,
        showDesktop: true,
        overviewOnly: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.events?.map((item) => [
        item?.event_kind,
        item?.address,
        item?.address_name,
        item?.block_hash,
        item?.transaction_hash,
        item?.chain,
        item?.contract?.name,
        item?.date ? unixToDate(item.date) : undefined,
        item?.date,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.events || [], [data]);

  const withError = useMemo(() => {
    if (data?.error) {
      return true;
    }
    return false;
  }, [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      total,
      raw,
      withError,
    }),
    [cols, rows, raw, total, withError],
  );

  return ctx;
};
