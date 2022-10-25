import { EventKinds } from './eventkinds';
import { Address } from './addresses';
import { Chain } from './chains';
import { Token } from './tokens';
import { Fiat } from './fiat';
import { Dao } from './organizations';
import { Platform } from './platforms';

export type EventTypes =
  | 'address_event'
  | 'chain_event'
  | 'gas_event'
  | 'hash_event'
  | 'infusion_event'
  | 'market_event'
  | 'organization_event'
  | 'sale_event'
  | 'string_event'
  | 'token_event'
  | 'transaction_settle_event';

export type EventTypeMap = {
  [key in EventKinds]: EventTypes | null;
};

export type ChainEvent = {
  name?: string;
  value?: string;
  chain?: Chain;
};

export type GasEvent = {
  price?: string;
  fee?: string;
  amount?: string;
  address?: Address;
};

export type HashEvent = {
  hash?: string;
};

export type InfusionEvent = {
  token_id?: string;
  base_token?: Token;
  infused_token?: Token;
  infused_value?: string;
};

export type MarketEvent = {
  base_token?: Token;
  quote_token?: Token;
  market_event_kind?: string;
  market_id?: string;
  price?: string;
  end_price?: string;
  fiat_price?: Fiat;
};

export type OrganizationEvent = {
  organization?: Dao;
  address?: Address;
};

export type SaleEvent = {
  hash?: string;
  sale_event_kind?: string;
};

export type StringEvent = {
  string_value?: string;
};

export type TokenEvent = {
  token?: Token;
  value?: string;
  chain_name?: string;
};

export type TransactionSettleEvent = {
  hash?: string;
  platform?: Platform;
};

export type AddressEvent = {
  address: Address;
};

export interface EventData {
  address_event?: AddressEvent;
  chain_event?: ChainEvent;
  gas_event?: GasEvent;
  hash_event?: HashEvent;
  infusion_event?: InfusionEvent;
  market_event?: MarketEvent;
  organization_event?: OrganizationEvent;
  sale_event?: SaleEvent;
  string_event?: StringEvent;
  token_event?: TokenEvent;
  transaction_settle_event?: TransactionSettleEvent;
}
