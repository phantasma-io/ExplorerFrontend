import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { Address, AddressResults } from 'types/api';
import { Balance } from 'types/api/addresses';

export const useAddressData = (data?: AddressResults, loading?: boolean) => {
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
        id: 'address',
        label: echo('address'),
        type: 'monospace',
        size: 6,
        showDesktop: true,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
          primary: true,
        },
      },
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        append: ' @ Phantasma',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'stake',
        label: echo('stake'),
        type: 'number',
        size: 10,
        append: ' SOUL',
      },
      {
        id: 'unclaimed',
        label: echo('unclaimed'),
        type: 'number',
        size: 10,
        append: ' KCAL',
      },
      {
        id: 'storage',
        label: echo('storage'),
        type: 'number',
        size: 3,
        append: ' Bytes',
        showDesktop: true,
      },
      {
        id: 'storage-used',
        label: echo('used'),
        type: 'number',
        size: 10,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.addresses?.map((item) => [
        item?.address,
        item?.address_name,
        item?.stake,
        item?.unclaimed,
        item?.storage?.available,
        item?.storage?.used,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.addresses || [], [data]);

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

export const useAddressesTopTokenHoldersData = (token_id: string, data?: AddressResults, loading?: boolean) => {
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
        id: 'address',
        label: echo('address'),
        type: 'monospace',
        size: 6,
        showDesktop: true,
        linkOptions: {
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
          primary: true,
        },
      },
      {
        id: 'name',
        label: echo('name'),
        type: 'text',
        append: ' @ Phantasma',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'amount',
        label: echo('amount'),
        type: 'number',
        size: 2,
        append: ` ${token_id}`,
        showDesktop: true,
      }
    ];
  }, [echo]);

  let is_token_soul = token_id == "SOUL";

  const get_amount = (addr: Address, b: Balance): number => {
    let is_soul = b.token?.symbol?.toString().toUpperCase() == "SOUL";
    let amount = parseFloat(b.amount ?? "0");
    if (!is_soul) {
      return amount
    }
    let staked = parseFloat(addr.stake ?? "0");
    // SOUL holding amount: balance amount + staked amount
    return amount + staked
  }

  const extract_amount = (addr: Address, token_id: string): number => {
    let bal = addr.balances?.find((v) => {
      return (
        v.token?.symbol?.toString().toUpperCase() == token_id.toUpperCase()
      );
    });
    if (!bal) {
      if (is_token_soul) {
        let result = parseFloat(addr.stake ?? '0');
        return result > 1 ? Math.floor(result) : result;
      }
      return 0;
    }

    let result = get_amount(addr, bal);
    return result > 1 ? Math.floor(result) : result;
  };


  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.addresses?.map((item) => [
        item?.address,
        item?.address_name,
        extract_amount(item, token_id)
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.addresses || [], [data]);

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
