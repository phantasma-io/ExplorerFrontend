import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { unixToDate } from 'scripts';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { EventResults } from 'types/api';

export const useEventData = (data?: EventResults, loading?: boolean) => {
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
        id: 'event_kind',
        label: t('event_kind'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'address',
        label: t('address'),
        type: 'monospace',
        size: 3,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'address_name',
        label: t('address_name'),
        type: 'text',
        size: 3,
      },
      {
        id: 'block_hash',
        label: t('block_hash'),
        type: 'monospace',
        size: 7,
        linkOptions: {
          route: '/block',
          key: 'block_hash',
          title: t('explore-block'),
        },
      },
      {
        id: 'transaction_hash',
        label: t('transaction_hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/transaction',
          key: 'transaction_hash',
          title: t('explore-transaction'),
        },
      },
      {
        id: 'chain',
        label: t('chain'),
        type: 'text',
        size: 3,
      },
      {
        id: 'contract',
        label: t('contract'),
        type: 'text',
        size: 3,
        linkOptions: {
          route: '/contract',
          key: 'contract',
          title: t('explore-contract'),
        },
      },
      {
        id: 'date',
        label: t('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [t]);

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
    [cols, rows, total, raw, withError],
  );

  return ctx;
};
