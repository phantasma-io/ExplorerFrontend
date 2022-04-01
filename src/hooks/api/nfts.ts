import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { NftResults } from 'types/api';

export const useNftData = (data?: NftResults, loading?: boolean) => {
  const { echo } = useEcho();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (data?.total_results && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // metadata
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
        id: 'mint_number',
        label: echo('mint_number'),
        type: 'number',
        size: 1,
        showDesktop: true,
      },
      {
        id: 'mint_date',
        label: echo('mint_date'),
        type: 'date',
        size: 3,
        showDesktop: true,
      },
      {
        id: 'ram',
        label: echo('ram'),
        type: 'script',
        size: 2,
      },
      {
        id: 'rom',
        label: echo('rom'),
        type: 'script',
        size: 2,
      },
      // root
      {
        id: 'symbol',
        label: echo('symbol'),
        type: 'text',
        size: 3,
      },
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
      },
      {
        id: 'contract',
        label: echo('contract'),
        type: 'text',
        size: 2,
      },
      {
        id: 'chain',
        label: echo('chain'),
        type: 'text',
        size: 2,
      },
      // series
      {
        id: 'series_name',
        label: echo('series_name'),
        type: 'text',
        size: 3,
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
        id: 'series_desc',
        label: echo('series_desc'),
        type: 'text',
        size: 5,
      },
      {
        id: 'series_creator',
        label: echo('series_creator'),
        type: 'monospace',
        size: 1,
      },
      {
        id: 'image',
        label: echo('image'),
        type: 'monospace',
        size: 5,
      },
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
        showDesktop: true,
      },
      {
        id: 'royalties',
        label: echo('royalties'),
        type: 'text',
        size: 1,
        showDesktop: true,
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
        // metadata
        item?.nft_metadata?.name,
        item?.nft_metadata?.description,
        item?.nft_metadata?.image,
        item?.nft_metadata?.mint_number,
        item?.nft_metadata?.mint_date,
        item?.nft_metadata?.ram,
        item?.nft_metadata?.rom,
        // root
        item?.symbol,
        item?.creator_onchain_name,
        item?.creator_address,
        item?.contract?.name,
        item?.chain,
        // series
        item?.series?.name,
        item?.series?.current_supply,
        item?.series?.max_supply,
        item?.series?.description,
        item?.series?.creator,
        item?.series?.image,
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
