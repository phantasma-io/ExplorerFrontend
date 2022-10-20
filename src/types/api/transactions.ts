import { ListParams, ListResults } from './list';
import { EventResult } from './events';
import { Address } from './addresses';

export interface Transaction {
  hash?: string;
  block_hash?: string;
  block_height?: string;
  fee?: string;
  fee_raw?: string;
  gas_limit?: string;
  gas_limit_raw?: string;
  gas_price?: string;
  gas_price_raw?: string;
  gas_payer?: Address;
  gas_target?: Address;
  sender?: Address;
  result?: string;
  payload?: string;
  state?: string;
  index?: number;
  date?: string;
  expiration?: string;
  events?: EventResult[];
}

export interface TransactionParams extends ListParams {
  hash?: string;
  address?: string;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
