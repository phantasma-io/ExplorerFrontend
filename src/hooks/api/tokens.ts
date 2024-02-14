import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { TokenResults } from 'types/api';

export const useTokenData = (data?: TokenResults, loading?: boolean) => {
  const { echo } = useEcho();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (data?.total_results && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // thumb
      {
        id: 'thumbnail',
        label: echo('image'),
        type: 'thumbnail-mini',
        size: 2,
      },
      // data
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 2,
        showDesktop: true
      },
      {
        id: 'symbol',
        label: echo('symbol'),
        type: 'text',
        size: 2,
        showDesktop: true,
        linkOptions: {
          route: '/token',
          key: 'symbol',
          title: echo('explore-token'),
          primary: true,
        },
      },
      {
        id: 'current_supply',
        label: echo('currentSupply'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'burned_supply',
        label: echo('burnedSupply'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'max_supply',
        label: echo('maxSupply'),
        type: 'number',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'decimals',
        label: echo('decimals'),
        type: 'number',
        size: 1,
      },
      {
        id: 'fungible',
        label: echo('fungible'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'transferable',
        label: echo('transferable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'finite',
        label: echo('finite'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'divisible',
        label: echo('divisible'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'fuel',
        label: echo('fuel'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'stakable',
        label: echo('stakable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'fiat',
        label: echo('fiat'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'swappable',
        label: echo('swappable'),
        type: 'boolean',
        size: 1,
      },
      {
        id: 'burnable',
        label: echo('burnable'),
        type: 'boolean',
        size: 1,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.tokens?.map((item) => [
        // thumb
        item?.token_logos && item.token_logos[0] && item?.token_logos[0].url,
        // data
        item?.name,
        item?.symbol,
        item?.current_supply?.split('.')[0] == '0' ? item?.current_supply : item?.current_supply?.split('.')[0],
        item?.burned_supply?.split('.')[0] == '0' ? item?.burned_supply : item?.burned_supply?.split('.')[0],
        item?.max_supply,
        item?.decimals,
        item?.fungible,
        item?.transferable,
        item?.finite,
        item?.divisible,
        item?.fuel,
        item?.stakable,
        item?.fiat,
        item?.swappable,
        item?.burnable,
        // item?.script_raw,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.tokens || [], [data]);

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
