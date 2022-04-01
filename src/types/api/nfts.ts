import { ListParams, ListResults } from './list';
import { InfusedInto, Infusion } from './infusions';
import { Series } from './series';
import { Contract } from './contracts';

export interface NftMetadata {
  description?: string;
  name?: string;
  image?: string;
  video?: string;
  info_url?: string;
  rom?: string;
  ram?: string;
  mint_date?: string;
  mint_number?: string;
}

export interface NftOwner {
  address?: string;
  onchain_name?: string;
  amount?: number;
}

export interface Nft {
  token_id?: string;
  chain?: string;
  symbol?: string;
  creator_address?: string;
  creator_onchain_name?: string;
  owners?: NftOwner[];
  contract?: Contract;
  nft_metadata?: NftMetadata;
  series?: Series;
  infusion?: Infusion[];
  infused_into?: InfusedInto;
}

export interface NftParams extends ListParams {
  fiat_currency?: string;
  creator?: string;
  owner?: string;
  contract?: string;
  name?: string;
  chain?: string;
  symbol?: string;
  token_id?: string;
  series_id?: string;
  status?: string;
}

export interface NftResults extends ListResults {
  nfts?: Nft[];
}
