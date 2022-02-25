import { ListParams, ListResults, WithOption } from './list';
import { EventResult } from './events';

export interface Transaction {
  hash: string;
  blockHeight: string;
  index: number;
  events: EventResult[];
}

export interface TransactionParams extends ListParams {
  hash?: string;
  with_nft?: WithOption;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
