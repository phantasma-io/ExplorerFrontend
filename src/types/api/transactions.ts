import { ListParams, ListResults } from './list';
import { EventResult } from './events';

export interface Transaction {
  hash?: string;
  block_hash?: string;
  block_height?: string;
  fee?: string;
  result?: string;
  payload?: string;
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
