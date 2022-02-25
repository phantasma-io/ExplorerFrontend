import { ListParams, ListResults } from './list';
import { EventResult } from './events';

export interface Transaction {
  hash: string;
  blockHeight: string;
  index: number;
  events: EventResult[];
}

export interface TransactionParams extends ListParams {
  hash?: string;
  with_nft?: number;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
