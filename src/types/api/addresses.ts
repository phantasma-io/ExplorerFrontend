import { ListParams, ListResults, WithOption } from './list';

export interface Address {
  address?: string;
  address_name?: string;
  stake?: string;
  unclaimed?: string;
}

export interface AddressParams
  extends ListParams,
    Pick<Address, 'address' | 'address_name'> {
  with_storage: WithOption;
  with_stakes: WithOption;
  with_balance: WithOption;
  with_transactions: WithOption;
}

export interface AddressResults extends ListResults {
  addresses?: Address[];
}
