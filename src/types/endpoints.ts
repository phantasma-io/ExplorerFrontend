import {
  DaoParams,
  NftParams,
  ChainParams,
  EventParams,
  TokenParams,
  SeriesParams,
  ContractParams,
  EventKindParams,
  IntructionParams,
  TransactionParams,
  BlockParams,
  HistoryPriceParams,
  OracleParams,
  SearchParams,
  AddressParams,
} from './api';

export type ExplorerEndpoints =
  | '/blocks'
  | '/chains'
  | '/addresses'
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
  | BlockParams
  | ChainParams
  | ContractParams
  | EventKindParams
  | EventParams
  | IntructionParams
  | NftParams
  | OracleParams
  | AddressParams
  | DaoParams
  | HistoryPriceParams
  | SeriesParams
  | SearchParams
  | TokenParams
  | TransactionParams;

export type ExplorerApi = {
  [key in ExplorerEndpoints]: (params?: ApiParams) => string;
};
