import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { useTokenData } from 'hooks/api';
import { TokenResults, TokenParams } from 'types/api';
import { Table } from 'components/table';

export const TokensList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useEmpathy<TokenResults>(
    endpoints['/tokens']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      with_logo: 1,
      with_price: 1,
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
          title: echo('details-token'),
        }}
        linkOptions={{
          route: '/token',
          key: 'symbol',
          title: echo('explore-token'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
      />
    </Box>
  );
};
