import React, { useState } from 'react';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useI18n, useTable } from 'hooks';
import { useContractData } from 'hooks/api';
import { ContractResults, ContractParams } from 'types/api';
import { Table } from 'components/table';
import { ContractsListFilters } from './filters';

export const ContractsList = () => {
  const { t } = useI18n();

  const tableProps = useTable();
  const { limit, order_by, offset, with_total } = tableProps;

  // filter states
  const [hash, hashSet] = useState<ContractParams['hash']>(undefined);
  const [symbol, symbolSet] = useState<ContractParams['symbol']>(undefined);

  const { data, loading, error } = useApi<ContractResults>(
    endpoints['/contracts']({
      offset,
      limit,
      order_by,
      order_direction: 'asc',
      with_total,
      hash,
      symbol,
    } as ContractParams),
  );

  const { cols, rows, total } = useContractData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Contracts"
        raw={data?.contracts || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: t('details-contract'),
        }}
        linkOptions={{
          route: '/contract',
          key: 'name',
          title: t('explore-contract'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <ContractsListFilters
            hash={hash}
            hashSet={hashSet}
            symbol={symbol}
            symbolSet={symbolSet}
          />
        }
      />
    </Box>
  );
};
