import { ListParams, ListResults, WithOption } from './list';

export interface Block {
  height?: string;
  hash?: string;
  previous_hash?: string;
  protocol?: number;
  chain_address?: string;
  validator_address?: string;
  date?: string;
}

export interface BlockParams extends ListParams {
  hash?: string;
  hash_partial?: string;
  height?: string;
  with_fiat?: WithOption;
}

export interface BlockResults extends ListResults {
  blocks?: Block[];
}
