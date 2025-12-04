import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { ContractResults } from 'types/api';

export const useContractData = (data?: ContractResults, loading?: boolean) => {
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
        size: 5,
        showDesktop: true,
      },
      {
        id: 'hash',
        label: t('hash'),
        type: 'text',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'symbol',
        label: t('symbol'),
        type: 'text',
        size: 3,
        showDesktop: true,
        linkOptions: {
          route: '/contract',
          key: 'symbol',
          title: t('explore-contract'),
          primary: true,
        },
      },
      {
        id: 'address',
        label: t('address'),
        type: 'text',
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
        id: 'token',
        label: t('token'),
        type: 'text',
        size: 3,
        linkOptions: {
          route: '/token',
          key: 'token',
          title: t('explore-token'),
        },
      },
    ];
  }, [t]);

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
