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
} from './api';

export type ExplorerEndpoints =
  | '/addresses'
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
  | ChainParams
  | ContractParams
  | EventKindParams
  | EventParams
  | IntructionParams
  | NftParams
  | DaoParams
  | SeriesParams
  | TokenParams
  | TransactionParams;

export type ExplorerApi = {
  [key in ExplorerEndpoints]: (params?: ApiParams) => string;
};
