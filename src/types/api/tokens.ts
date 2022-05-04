import { ListParams, ListResults, WithOption } from './list';

export interface Token {
  symbol?: string;
  fungible?: boolean;
  transferable?: boolean;
  finite?: boolean;
  divisible?: boolean;
  fuel?: boolean;
  stakable?: boolean;
  fiat?: boolean;
  swappable?: boolean;
  burnable?: boolean;
  decimals?: number;
  current_supply?: string;
  max_supply?: string;
  burned_supply?: string;
  script_raw?: string;
}

export interface TokenParams extends ListParams {
  symbol?: string;
  with_logo?: WithOption;
  with_price?: WithOption;
}

export interface TokenResults extends ListResults {
  tokens?: Token[];
}
