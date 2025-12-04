import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useI18n } from 'hooks';
import { useTransactionData } from 'hooks/api';
import { TransactionResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';
import { EventActivity } from 'components/display/EventActivity';
import { unixToDate } from 'scripts';
import { TableDisplayRow, TableDisplayCol } from 'types/table';

export interface TransactionAdvancedProps {
  data?: TransactionResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TransactionAdvanced = ({
  data,
  loading,
  error,
}: TransactionAdvancedProps) => {
  const { t } = useI18n();
  const renderOverview = useRenderOverview();

  const { raw } = useTransactionData(data);

  const rows = useMemo(() => {
    if (data) {
      const sanitizeExpiration = (expiration?: string) => {
        if (!expiration || expiration === '0') return undefined;
        return unixToDate(expiration);
      };

      return data?.transactions?.map((item) => [
        item?.gas_limit ? `${item.gas_limit} KCAL` : 'unlimited',
        item?.gas_price,
        item?.gas_target?.address,
        item?.gas_payer?.address,
        item?.sender?.address,
        item?.date ? unixToDate(item.date) : undefined,
        sanitizeExpiration(item?.expiration),
        item?.fee,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      {
        id: 'gas_limit',
        label: t('gas_limit'),
        type: 'text',
        size: 2,
      },
      {
        id: 'gas_price',
        label: t('gas_price'),
        type: 'text',
        size: 2,
        append: ' KCAL',
      },
      {
        id: 'gas_target',
        label: t('gas_target'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'gas_payer',
        label: t('gas_payer'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'sender',
        label: t('sender'),
        type: 'text',
        size: 2,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      {
        id: 'date',
        label: t('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'expiration',
        label: t('expiration'),
        type: 'date',
        size: 2,
      },
      {
        id: 'fee',
        label: t('fee'),
        type: 'text',
        size: 2,
        append: ' KCAL',
      },
    ];
  }, [t]);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (rows.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Overview>
        <Box>{data && renderOverview(cols, rows)}</Box>
        <Box>
          <EventActivity data={raw[0].events} />
        </Box>
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw]);

  return <Box p={1}>{content}</Box>;
};
