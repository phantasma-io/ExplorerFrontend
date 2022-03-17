import React, { useMemo } from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { NftResults } from 'types/api';
import { Table } from 'components/table';

export const NftsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  const { data } = useEmpathy<NftResults>(
    endpoints['/nfts']({
      offset,
      limit,
      order_by,
      order_direction: 'desc',
      with_total,
    }),
  );

  const cols = useMemo<TableDisplayCol[]>(
    () => [
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
        size: 3,
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
    ],
    [echo],
  );

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

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Nfts"
        raw={data?.nfts || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-nft'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
