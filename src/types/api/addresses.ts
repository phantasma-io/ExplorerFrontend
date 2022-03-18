import { ListParams, ListResults, WithOption } from './list';
import { Chain } from './chains';
import { Token } from './tokens';

export interface Balance {
  amount?: string;
  chain?: Chain;
  token?: Token;
}
export interface Address {
  address?: string;
  address_name?: string;
  stake?: string;
  unclaimed?: string;
  storage?: {
    available?: number;
    avatar?: string;
    used?: number;
  };
  balances?: Balance[];
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
