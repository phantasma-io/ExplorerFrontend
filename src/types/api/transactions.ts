import { ListParams, ListResults, WithOption } from './list';

export interface Transaction {
  hash?: string;
  block_hash?: string;
  block_height?: string;
  index?: number;
  date?: string;
}

export interface TransactionParams extends ListParams {
  hash?: string;
  with_events?: WithOption;
  with_event_data?: WithOption;
}

export interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
