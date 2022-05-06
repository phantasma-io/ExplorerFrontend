import { ListParams, ListResults } from './list';

export interface Transaction {
  hash?: string;
  block_hash?: string;
  block_height?: string;
  index?: number;
  date?: string;
}

export interface TransactionParams extends ListParams {
  hash?: string;
  address?: string;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
