import { Locales } from 'types/locales';

export type ExplorerRoutes =
  | '/'
  | '/nexus'
  | '/chain'
  | '/address'
  | '/block'
  | '/contract'
  | '/dao'
  | '/token'
  | '/transaction';

export type ExplorerTabs =
  | 'overview'
  | 'addresses'
  | 'chains'
  | 'tokens'
  | 'nfts'
  | 'daos'
  | 'blocks'
  | 'contracts'
  | 'balances'
  | 'transactions'
  | 'events'
  | 'oracles'
  | 'platforms'
  | 'series'
  | 'script'
  | 'members';

export type RouterParams = {
  id?: string;
  tab?: ExplorerTabs;
};

export type ExplorerRouter = {
  [key in ExplorerRoutes]: (locale: Locales, params?: RouterParams) => string;
};
