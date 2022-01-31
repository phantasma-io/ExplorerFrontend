interface EventResult {
  chain?: string;
  contract?: string;
  date?: string;
  transaction_hash?: string;
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
  onchain_name?: string;
  nft_metadata?: NftMetadata;
  series?: Series;
}

interface EventParams extends ListParams {
  chain?: string;
  contract?: string;
  token_id?: string;
  date_day?: string;
  date_less?: string;
  date_greater?: string;
  event_kind?: string;
  event_kind_partial?: string;
  nft_name_partial?: string;
  nft_description_partial?: string;
  show_events?: string;
  address?: string;
  address_partial?: string;
  with_metadata?: number;
  with_series?: number;
  fiat_currency?: string;
}

interface EventResults extends ListResults {
  events?: EventResult[];
}
