import { useMemo } from 'react';
import { useEcho } from 'hooks/useEcho';
import { TableDisplayRow, TableDisplayCol } from 'types/table';
import { BlockResults } from 'types/api';
import { unixToDate } from 'scripts';

export const useBlockData = (data?: BlockResults, loading?: boolean) => {
  const { echo } = useEcho();
  const total = data?.total_results ?? 0;

  const cols = useMemo<TableDisplayCol[]>(() => {
    return [
      {
        id: 'height',
        label: echo('height'),
        type: 'text',
        size: 2,
        showDesktop: true,
        linkOptions: {
          route: '/block',
          key: 'height',
          title: echo('explore-block'),
          primary: true,
        },
      },
      {
        id: 'date',
        label: echo('date'),
        type: 'date',
        size: 2,
        showDesktop: true,
      },
      {
        id: 'date_unix',
        label: `${echo('date')} (unix)`,
        type: 'monospace',
        size: 2,
        showDesktop: true,
        overviewOnly: true,
      },
      {
        id: 'protocol',
        label: echo('protocol'),
        type: 'number',
        size: 1,
      },
      {
        id: 'reward',
        label: echo('reward'),
        type: 'text',
        size: 1,
      },
      {
        id: 'chain_address',
        label: echo('chainAddress'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/address',
          key: 'chain_address',
          title: echo('explore-address'),
        },
      },
      {
        id: 'validator_address',
        label: echo('validatorAddress'),
        type: 'monospace',
        size: 12,
        linkOptions: {
          route: '/address',
          key: 'validator_address',
          title: echo('explore-address'),
        },
      },
      {
        id: 'hash',
        label: echo('hash'),
        type: 'monospace',
        size: 7,
        showDesktop: true
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
    ];
  }, [echo]);

  const rows: TableDisplayRow[] = useMemo<TableDisplayRow[]>(() => {
    if (data) {
      return data?.blocks?.map((item) => [
        item?.height,
        item?.date ? unixToDate(item.date) : undefined,
        item?.date,
        item?.protocol,
        item?.reward,
        item?.chain_address,
        item?.validator_address,
        item?.hash,
        item?.previous_hash,
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
    [cols, rows, raw, total],
  );

  return ctx;
};
