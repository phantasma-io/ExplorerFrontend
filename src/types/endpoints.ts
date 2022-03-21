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
  HistoryPriceParams,
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
  | '/platforms'
  | '/series'
  | '/historyprices'
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
  | HistoryPriceParams
  | SeriesParams
  | TokenParams
  | TransactionParams;

export type ExplorerApi = {
  [key in ExplorerEndpoints]: (params?: ApiParams) => string;
};
