import {
  DaoParams,
  NftParams,
  ChainParams,
  EventParams,
  TokenParams,
  SeriesParams,
  AddressParams,
  ContractParams,
  EventKindParams,
  IntructionParams,
  TransactionParams,
  BlockParams,
  PlatformParams,
} from './api';

export type ExplorerEndpoints =
  | '/addresses'
  | '/blocks'
  | '/chains'
  | '/contracts'
  | '/instructions'
  | '/eventkinds'
  | '/events'
  | '/nfts'
  | '/organizations'
  | '/series'
  | '/tokens'
  | '/transactions';

export type ApiParams =
  | AddressParams
  | BlockParams
  | ChainParams
  | ContractParams
  | EventKindParams
  | EventParams
  | IntructionParams
  | NftParams
  | DaoParams
  | PlatformParams
  | SeriesParams
  | TokenParams
  | TransactionParams;

export type ExplorerApi = {
  [key in ExplorerEndpoints]: (params?: ApiParams) => string;
};
