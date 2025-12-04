import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { useTokenData } from 'hooks/api';
import { TokenResults, TokenParams } from 'types/api';
import { Table } from 'components/table';
import { TokensListFilters } from './filters';

export const TokensList = () => {
  const { t } = useI18n();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  // filter states
  const [symbol, symbolSet] = useState<TokenParams['symbol']>(undefined);

  const { data, loading, error } = useApi<TokenResults>(
    endpoints['/tokens']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      with_logo: 1,
      with_price: 1,
      symbol,
    } as TokenParams),
  );

  const { cols, rows, total } = useTokenData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Tokens"
        raw={data?.tokens || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: t('details-token'),
        }}
        linkOptions={{
          route: '/token',
          key: 'symbol',
          title: t('explore-token'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={<TokensListFilters symbol={symbol} symbolSet={symbolSet} />}
      />
    </Box>
  );
};
