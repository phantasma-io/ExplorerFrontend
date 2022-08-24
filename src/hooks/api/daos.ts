import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { DaoResults } from 'types/api';

export const useDaoData = (data?: DaoResults, loading?: boolean) => {
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
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/dao',
          key: 'name',
          title: echo('explore-dao'),
          primary: true,
        },
      },
      {
        id: 'size',
        label: echo('size'),
        type: 'text',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'addressName',
        label: echo('addressName'),
        type: 'text',
        size: 2,
      },
      {
        id: 'address',
        label: echo('address'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        },
      },
      {
        id: 'eventAddress',
        label: echo('eventAddress'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'eventAddress',
          title: echo('explore-address'),
        },
      },
      {
        id: 'eventBlock',
        label: echo('eventBlock'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/block',
          key: 'eventBlock',
          title: echo('explore-block'),
        },
      },
      {
        id: 'eventChain',
        label: echo('eventChain'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventContract',
        label: echo('eventContract'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/contract',
          key: 'eventContract',
          title: echo('explore-contract'),
        },
      },
      {
        id: 'eventID',
        label: echo('eventID'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventKind',
        label: echo('eventKind'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventTransaction',
        label: echo('eventTransaction'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/transaction',
          key: 'eventTransaction',
          title: echo('explore-transaction'),
        },
      },
      {
        id: 'eventDate',
        label: echo('eventDate'),
        type: 'date',
        size: 2,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.organizations?.map((item) => [
        item?.name,
        item?.size,
        item?.address?.address_name,
        item?.address?.address,
        item?.create_event?.address,
        item?.create_event?.block_hash,
        item?.create_event?.chain,
        item?.create_event?.contract?.name,
        item?.create_event?.event_id,
        item?.create_event?.event_kind,
        item?.create_event?.transaction_hash,
        item?.create_event?.date,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.organizations || [], [data]);

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
