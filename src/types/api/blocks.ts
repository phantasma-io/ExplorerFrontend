import { ListParams, ListResults, WithOption } from './list';
import { Transaction } from './transactions';

export interface Oracle {
  url: string;
  content: string;
}

export interface Block {
  height: string;
  hash: string;
  previous_hash: string;
  protocol: number;
  chain_address: string;
  validator_address: string;
  oracles: Oracle[];
  transactions: Transaction[];
}

export interface BlockParams extends ListParams {
  hash: string;
  hash_partial: string;
  height: string;
  with_oracles: WithOption;
  with_transactions: WithOption;
  with_events: WithOption;
  with_event_data: WithOption;
  with_nft: WithOption;
  with_fiat: WithOption;
}

export interface BlockResults extends ListResults {
  blocks?: Block[];
}
