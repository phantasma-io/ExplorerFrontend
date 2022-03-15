import { ListParams, ListResults } from './list';

export interface Address {
  address?: string;
  address_name?: string;
  stake?: string;
  unclaimed?: string;
}

export interface AddressParams
  extends ListParams,
    Pick<Address, 'address' | 'address_name'> {
  with_storage: 0 | 1;
  with_stakes: 0 | 1;
  with_balance: 0 | 1;
  with_transactions: 0 | 1;
}

export interface AddressResults extends ListResults {
  addresses?: Address[];
}
