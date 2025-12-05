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
  HistoryPriceParams,
  OracleParams,
  SearchParams,
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
  | '/oracles'
  | '/organizations'
  | '/series'
  | '/searches'
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
  | OracleParams
  | DaoParams
  | HistoryPriceParams
  | SeriesParams
  | SearchParams
  | TokenParams
  | TransactionParams;

export type ExplorerApi = {
  [key in ExplorerEndpoints]: (params?: ApiParams) => string;
};
