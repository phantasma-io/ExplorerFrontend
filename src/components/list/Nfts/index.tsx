import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useNftData } from 'hooks/api';
import { NftResults, NftParams } from 'types/api';
import { Table } from 'components/table';
import { NftsListFilters } from './filters';

export const NftsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total, order_direction } = tableProps;

  // filter states
  const [name, nameSet] = useState<NftParams['name']>(undefined);
  const [symbol, symbolSet] = useState<NftParams['symbol']>(undefined);

  const { data, loading, error } = useApi<NftResults>(
    endpoints['/nfts']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      name,
      symbol,
    } as NftParams),
  );

  const { cols, rows, total } = useNftData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Nfts"
        raw={data?.nfts || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-nft'),
        }}
        linkOptions={{
          route: '/nft',
          key: 'token_id',
          title: echo('explore-nft'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <NftsListFilters
            name={name}
            nameSet={nameSet}
            symbol={symbol}
            symbolSet={symbolSet}
          />
        }
      />
    </Box>
  );
};
