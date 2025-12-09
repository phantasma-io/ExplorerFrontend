import { useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { NftResults } from 'types/api';
import { unixToDate } from 'scripts';

export const useNftData = (data?: NftResults, loading?: boolean) => {
  const { echo } = useEcho();
  const total = data?.total_results ?? 0;

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // thumb
      {
        id: 'thumbnail',
        label: echo('image'),
        type: 'thumbnail',
        size: 2,
      },
      // data
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        size: 5,
        showDesktop: true,
      },
      {
        id: 'description',
        label: echo('description'),
        type: 'text',
        size: 2,
      },
      {
        id: 'image',
        label: echo('image'),
        type: 'monospace',
        size: 2,
      },
      {
        id: 'current_supply',
        label: echo('current_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'max_supply',
        label: echo('max_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'mint_number',
        label: echo('mint_number'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'mint_date',
        label: echo('mint_date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'contract',
        label: echo('contract'),
        type: 'monospace',
        size: 2,
        showDesktop: true,
        linkOptions: {
          route: '/contract',
          key: 'contract',
          title: echo('explore-contract'),
        },
      },
      {
        id: 'symbol',
        label: echo('symbol'),
        type: 'monospace',
        size: 3,
        linkOptions: {
          route: '/token',
          key: 'symbol',
          title: echo('explore-token'),
        },
      },
      // {
      //   id: 'rom',
      //   label: echo('rom'),
      //   type: 'script',
      //   size: 2,
      // },
      // {
      //   id: 'ram',
      //   label: echo('ram'),
      //   type: 'script',
      //   size: 2,
      // },
      {
        id: 'creator_onchain_name',
        label: echo('creator_onchain_name'),
        type: 'text',
        size: 4,
      },
      {
        id: 'creator_address',
        label: echo('creator_address'),
        type: 'monospace',
        size: 3,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        },
      },
      // {
      //   id: 'chain',
      //   label: echo('chain'),
      //   type: 'text',
      //   size: 2,
      // },
      // {
      //   id: 'series_name',
      //   label: echo('series_name'),
      //   type: 'text',
      //   size: 3,
      // },
      // {
      //   id: 'series_desc',
      //   label: echo('series_desc'),
      //   type: 'text',
      //   size: 5,
      // },
      // {
      //   id: 'series_creator',
      //   label: echo('series_creator'),
      //   type: 'monospace',
      //   size: 1,
      //   linkOptions: {
      //     route: '/address',
      //     key: 'address',
      //     title: echo('explore-address'),
      //   },
      // },
      // {
      //   id: 'image',
      //   label: echo('image'),
      //   type: 'monospace',
      //   size: 5,
      // },
      {
        id: 'mode_name',
        label: echo('mode_name'),
        type: 'text',
        size: 5,
      },
      {
        id: 'type',
        label: echo('type'),
        type: 'text',
        size: 1,
      },
      {
        id: 'royalties',
        label: echo('royalties'),
        type: 'text',
        size: 1,
      },
      {
        id: 'attr_type_1',
        label: echo('attr_type_1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_1',
        label: echo('attr_value_1'),
        type: 'text',
        size: 2,
      },
      {
        id: 'attr_type_2',
        label: echo('attr_type_2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_2',
        label: echo('attr_value_2'),
        type: 'text',
        size: 2,
      },
      {
        id: 'attr_type_3',
        label: echo('attr_type_3'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_3',
        label: echo('attr_value_3'),
        type: 'text',
        size: 2,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.nfts?.map((item) => [
        // thumb
        item?.nft_metadata?.imageURL,
        // data
        item?.nft_metadata?.name,
        item?.nft_metadata?.description,
        item?.nft_metadata?.imageURL,
        item?.series?.current_supply,
        item?.series?.max_supply,
        item?.nft_metadata?.mint_number,
        item?.nft_metadata?.mint_date
          ? unixToDate(item?.nft_metadata?.mint_date)
          : undefined,
        item?.contract?.hash || item?.contract?.name,
        item?.symbol,
        // item?.nft_metadata?.rom,
        // item?.nft_metadata?.ram,
        item?.creator_onchain_name,
        item?.creator_address,
        // item?.chain,
        // item?.series?.name,
        // item?.series?.description,
        // item?.series?.creator,
        // item?.series?.image,
        item?.series?.mode_name,
        item?.series?.type,
        item?.series?.royalties,
        item?.series?.attr_type_1,
        item?.series?.attr_value_1,
        item?.series?.attr_type_2,
        item?.series?.attr_value_2,
        item?.series?.attr_type_3,
        item?.series?.attr_value_3,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.nfts || [], [data]);

  const ctx = useMemo(
    () => ({
      cols,
      rows,
      raw,
      total,
    }),
    [cols, rows, raw, total],
  );

  return ctx;
};
