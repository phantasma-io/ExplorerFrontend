import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { useNftData } from 'hooks/api';
import { NftResults, NftParams } from 'types/api';
import { Table } from 'components/table';
import { NftsListFilters } from './filters';

export const NftsList = () => {
  const { t } = useI18n();

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
          title: t('details-nft'),
        }}
        linkOptions={{
          route: '/nft',
          key: 'token_id',
          title: t('explore-nft'),
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
