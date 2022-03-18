import React from 'react';
import { useEcho } from '@ricardo-jrm/echo';
import { useEmpathy } from '@ricardo-jrm/empathy';
import { Box } from '@mui/material';
import { endpoints, TABLE_FILTERS } from 'cfg';
import { useTable } from 'hooks';
import { useContractData } from 'hooks/api';
import { ContractResults } from 'types/api';
import { Table } from 'components/table';

export const ContractsList = () => {
  const { echo } = useEcho();

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data } = useEmpathy<ContractResults>(
    endpoints['/contracts']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
    }),
  );

  const { cols, rows } = useContractData(data);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Contracts"
        raw={data?.contracts || []}
        cols={cols}
        rows={rows}
        total={data?.total_results || 0}
        dialogOptions={{
          title: echo('details-contract'),
        }}
        {...tableProps}
        filters={TABLE_FILTERS}
      />
    </Box>
  );
};
