import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { DaoResults } from 'types/api';

export const useDaoData = (data?: DaoResults, loading?: boolean) => {
  const { t } = useI18n();

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
        label: t('name'),
        type: 'text',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/dao',
          key: 'name',
          title: t('explore-dao'),
          primary: true,
        },
      },
      {
        id: 'size',
        label: t('size'),
        type: 'text',
        size: 4,
        showDesktop: true,
      },
      {
        id: 'addressName',
        label: t('addressName'),
        type: 'text',
        size: 2,
      },
      {
        id: 'address',
        label: t('address'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'eventAddress',
        label: t('eventAddress'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'eventAddress',
          title: t('explore-address'),
        },
      },
      {
        id: 'eventBlock',
        label: t('eventBlock'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/block',
          key: 'eventBlock',
          title: t('explore-block'),
        },
      },
      {
        id: 'eventChain',
        label: t('eventChain'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventContract',
        label: t('eventContract'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/contract',
          key: 'eventContract',
          title: t('explore-contract'),
        },
      },
      {
        id: 'eventID',
        label: t('eventID'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventKind',
        label: t('eventKind'),
        type: 'text',
        size: 2,
      },
      {
        id: 'eventTransaction',
        label: t('eventTransaction'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/transaction',
          key: 'eventTransaction',
          title: t('explore-transaction'),
        },
      },
      {
        id: 'eventDate',
        label: t('eventDate'),
        type: 'date',
        size: 2,
      },
    ];
  }, [t]);

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
