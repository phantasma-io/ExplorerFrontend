/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Box } from '@mui/material';
import { endpoints } from 'cfg';
import { useApi, useTable } from 'hooks';
import { useAddressData } from 'hooks/api';
import { AddressResults, AddressParams } from 'types/api';
import { Table } from 'components/table';
import { AddressesListFilters } from './filters';

export interface EventsListProps {
  _organization_name?: string;
}

export const AddressesList = ({ _organization_name }: EventsListProps) => {
  const { echo } = useEcho();

  // filter states
  const [address, addressSet] = useState<AddressParams['address']>(undefined);
  const [address_partial, address_partialSet] =
    useState<AddressParams['address_partial']>(undefined);
  const [address_name, address_nameSet] =
    useState<AddressParams['address_name']>(undefined);
  const [organization_name, organization_nameSet] = useState<
    AddressParams['organization_name']
  >(_organization_name || undefined);
  const [validator_kind, validator_kindSet] =
    useState<AddressParams['validator_kind']>(undefined);
  const [with_storage, with_storageSet] =
    useState<AddressParams['with_storage']>(1);
  const [with_stakes, with_stakesSet] =
    useState<AddressParams['with_stakes']>(1);
  const [with_balance, with_balanceSet] =
    useState<AddressParams['with_balance']>(1);

  const tableProps = useTable();
  const { limit, order_by, order_direction, offset, with_total } = tableProps;

  const { data, loading, error } = useApi<AddressResults>(
    endpoints['/addresses']({
      offset,
      limit,
      order_by,
      order_direction,
      with_total,
      with_balance,
      with_stakes,
      with_storage,
      address,
      address_partial,
      address_name,
      organization_name,
      validator_kind,
    } as AddressParams),
  );

  const { cols, rows, total } = useAddressData(data, loading);

  return (
    <Box>
      <Table
        tableId="PhantasmaExplorer-Addresses"
        raw={data?.addresses || []}
        cols={cols}
        rows={rows}
        total={total}
        dialogOptions={{
          title: echo('details-address'),
        }}
        linkOptions={{
          route: '/address',
          key: 'address',
          title: echo('explore-address'),
        }}
        {...tableProps}
        loading={loading}
        error={error}
        addon={
          <AddressesListFilters
            address={address}
            addressSet={addressSet}
            address_partial={address_partial}
            address_partialSet={address_partialSet}
            address_name={address_name}
            address_nameSet={address_nameSet}
            organization_name={organization_name}
            organization_nameSet={organization_nameSet}
            validator_kind={validator_kind}
            validator_kindSet={validator_kindSet}
            with_balance={with_balance}
            with_balanceSet={with_balanceSet}
            with_stakes={with_stakes}
            with_stakesSet={with_stakesSet}
            with_storage={with_storage}
            with_storageSet={with_storageSet}
          />
        }
      />
    </Box>
  );
};
