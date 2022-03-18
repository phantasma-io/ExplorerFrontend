import { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { NftResults } from 'types/api';

export const useNftData = (data?: NftResults) => {
  const { echo } = useEcho();

  const cols = useMemo<TableDisplayCol[]>(() => {
    if (data) {
      return [
        {
          id: 'symbol',
          label: echo('symbol'),
          type: 'text',
          size: 3,
          showDesktop: true,
        },
        {
          id: 'creator_onchain_name',
          label: echo('creator_onchain_name'),
          type: 'text',
          size: 4,
          showDesktop: true,
        },
        {
          id: 'creator_address',
          label: echo('creator_address'),
          type: 'monospace',
          size: 3,
        },
        {
          id: 'contract',
          label: echo('contract'),
          type: 'text',
          size: 2,
          showDesktop: true,
        },
        {
          id: 'chain',
          label: echo('chain'),
          type: 'text',
          size: 2,
          showDesktop: true,
        },
      ];
    }

    return [];
  }, [echo, data]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.nfts?.map((item) => [
        item?.symbol,
        item?.creator_onchain_name,
        item?.creator_address,
        item?.contract,
        item?.chain,
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
