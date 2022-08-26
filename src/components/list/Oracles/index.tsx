import React from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useTable } from 'hooks';
import { useOracleData } from 'hooks/api';
import { OracleResults, OracleParams } from 'types/api';
import { Table } from 'components/table';

export interface OraclesListProps {
  block_hash?: string;
}

export const OraclesList = ({ block_hash }: OraclesListProps) => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useEmpathy<OracleResults>(
    endpoints['/oracles']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      block_hash,
    } as OracleParams),
  );

  const { cols, rows, total } = useOracleData(data, loading);

  return (
    <Box>
      {block_hash ? (
        <Table
          tableId="PhantasmaExplorer-Oracles"
          raw={data?.oracles || []}
          cols={cols}
          rows={rows}
          total={total}
          dialogOptions={{
            title: echo('details-oracle'),
          }}
          // linkOptions={{
          //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //   // @ts-ignore
          //   route: '/oracle',
          //   key: 'block_hash',
          //   title: echo('explore-oracle'),
          // }}
          {...tableProps}
          loading={loading}
          error={error}
        />
      ) : null}
    </Box>
  );
};
