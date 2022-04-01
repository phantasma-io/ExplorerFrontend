import { ListParams, ListResults, WithOption } from './list';
import { Contract } from './contracts';
import { NftMetadata } from './nfts';
import { Series } from './series';

export interface EventResult {
  chain?: string;
  contract?: Contract;
  date?: string;
  transaction_hash?: string;
  block_hash?: string;
  token_id?: string;
  token_amount?: number;
  event_kind?: string;
  base_symbol?: string;
  quote_symbol?: string;
  price?: string;
  infused_symbol?: string;
  infused_value?: string;
  fiat_price?: string;
  fiat_currency?: string;
  source_address?: string;
  source_onchain_name?: string;
  address?: string;
  address_name?: string;
  onchain_name?: string;
  nft_metadata?: NftMetadata;
  series?: Series;
}

export interface EventParams extends ListParams {
  address?: string;
  block_hash?: string;
  block_height?: string;
  transaction_hash?: string;
  chain?: string;
  contract?: string;
  token_id?: string;
  event_kind?: string;
  date_day?: string;
  date_less?: string;
  date_greater?: string;
  with_event_data?: WithOption;
  with_metadata?: WithOption;
  with_series?: WithOption;
  with_fiat?: WithOption;
  with_nsfw?: WithOption;
  with_blacklisted?: WithOption;
}

export interface EventResults extends ListResults {
  events?: EventResult[];
}
