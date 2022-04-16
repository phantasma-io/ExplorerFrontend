import { Locales } from 'types/locales';

export type ExplorerRoutes =
  | '/'
  | '/nexus'
  | '/address'
  | '/block'
  | '/nft'
  | '/series'
  | '/token'
  | '/transaction';

export type ExplorerTabs =
  | 'overview'
  | 'addresses'
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
  | 'series';

export type RouterParams = {
  id?: string;
  tab?: ExplorerTabs;
};

export type ExplorerRouter = {
  [key in ExplorerRoutes]: (locale: Locales, params?: RouterParams) => string;
};
