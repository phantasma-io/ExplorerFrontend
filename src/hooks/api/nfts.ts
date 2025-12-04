import { useMemo, useState, useEffect } from 'react';
import { useI18n } from 'hooks';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { NftResults } from 'types/api';
import { unixToDate } from 'scripts';

export const useNftData = (data?: NftResults, loading?: boolean) => {
  const { t } = useI18n();

  const [total, totalSet] = useState<number>(0);

  useEffect(() => {
    if (typeof data?.total_results === 'number' && !loading) {
      totalSet(data.total_results);
    }
  }, [data, loading]);

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      // thumb
      {
        id: 'thumbnail',
        label: t('image'),
        type: 'thumbnail',
        size: 2,
      },
      // data
      {
        id: 'name',
        label: t('name'),
        type: 'text',
        size: 5,
        showDesktop: true,
      },
      {
        id: 'description',
        label: t('description'),
        type: 'text',
        size: 2,
      },
      {
        id: 'image',
        label: t('image'),
        type: 'monospace',
        size: 2,
      },
      {
        id: 'current_supply',
        label: t('current_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'max_supply',
        label: t('max_supply'),
        type: 'number',
        size: 3,
      },
      {
        id: 'mint_number',
        label: t('mint_number'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'mint_date',
        label: t('mint_date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'contract',
        label: t('contract'),
        type: 'text',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'symbol',
        label: t('symbol'),
        type: 'text',
        size: 3,
      },
      // {
      //   id: 'rom',
      //   label: t('rom'),
      //   type: 'script',
      //   size: 2,
      // },
      // {
      //   id: 'ram',
      //   label: t('ram'),
      //   type: 'script',
      //   size: 2,
      // },
      {
        id: 'creator_onchain_name',
        label: t('creator_onchain_name'),
        type: 'text',
        size: 4,
      },
      {
        id: 'creator_address',
        label: t('creator_address'),
        type: 'monospace',
        size: 3,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: t('explore-address'),
        },
      },
      // {
      //   id: 'chain',
      //   label: t('chain'),
      //   type: 'text',
      //   size: 2,
      // },
      // {
      //   id: 'series_name',
      //   label: t('series_name'),
      //   type: 'text',
      //   size: 3,
      // },
      // {
      //   id: 'series_desc',
      //   label: t('series_desc'),
      //   type: 'text',
      //   size: 5,
      // },
      // {
      //   id: 'series_creator',
      //   label: t('series_creator'),
      //   type: 'monospace',
      //   size: 1,
      //   linkOptions: {
      //     route: '/address',
      //     key: 'address',
      //     title: t('explore-address'),
      //   },
      // },
      // {
      //   id: 'image',
      //   label: t('image'),
      //   type: 'monospace',
      //   size: 5,
      // },
      {
        id: 'mode_name',
        label: t('mode_name'),
        type: 'text',
        size: 5,
      },
      {
        id: 'type',
        label: t('type'),
        type: 'text',
        size: 1,
      },
      {
        id: 'royalties',
        label: t('royalties'),
        type: 'text',
        size: 1,
      },
      {
        id: 'attr_type_1',
        label: t('attr_type_1'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_1',
        label: t('attr_value_1'),
        type: 'text',
        size: 2,
      },
      {
        id: 'attr_type_2',
        label: t('attr_type_2'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_2',
        label: t('attr_value_2'),
        type: 'text',
        size: 2,
      },
      {
        id: 'attr_type_3',
        label: t('attr_type_3'),
        type: 'text',
        size: 5,
      },
      {
        id: 'attr_value_3',
        label: t('attr_value_3'),
        type: 'text',
        size: 2,
      },
    ];
  }, [t]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.nfts?.map((item) => [
        // thumb
        item?.nft_metadata?.image,
        // data
        item?.nft_metadata?.name,
        item?.nft_metadata?.description,
        item?.nft_metadata?.image,
        item?.series?.current_supply,
        item?.series?.max_supply,
        item?.nft_metadata?.mint_number,
        item?.nft_metadata?.mint_date
          ? unixToDate(item?.nft_metadata?.mint_date)
          : undefined,
        item?.contract?.name,
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
