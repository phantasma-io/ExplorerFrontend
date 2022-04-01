import { useMemo, useState, useEffect } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { BlockResults } from 'types/api';
import { unixmsToDate } from 'scripts';

export const useBlockData = (data?: BlockResults, loading?: boolean) => {
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
        id: 'hash',
        label: echo('hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true,
        linkOptions: {
          route: '/block',
          key: 'hash',
          title: echo('explore-block'),
          primary: true,
        },
      },
      {
        id: 'height',
        label: echo('height'),
        type: 'number',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'protocol',
        label: echo('protocol'),
        type: 'number',
        size: 1,
      },
      {
        id: 'chain_address',
        label: echo('chainAddress'),
        type: 'monospace',
        size: 12,
      },
      {
        id: 'validator_address',
        label: echo('validatorAddress'),
        type: 'monospace',
        size: 12,
      },
      {
        id: 'previous_hash',
        label: echo('prevHash'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/block',
          key: 'previous_hash',
          title: echo('explore-block'),
        },
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
    ];
  }, [echo]);

  const rows = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.blocks?.map((item) => [
        item?.hash,
        item?.height,
        item?.protocol,
        item?.chain_address,
        item?.validator_address,
        item?.previous_hash,
        item?.date ? unixmsToDate(item.date) : undefined,
      ]) as TableDisplayRow[];
    }

    return [];
  }, [data]);

  const raw = useMemo(() => data?.blocks || [], [data]);

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
