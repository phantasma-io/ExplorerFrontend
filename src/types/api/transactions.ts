import { ListParams, ListResults } from './list';

export interface Transaction {
  hash?: string;
  blockHeight?: string;
  index?: number;
}

export interface TransactionParams extends ListParams {
  hash?: string;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
