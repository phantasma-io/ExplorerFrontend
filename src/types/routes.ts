import { Locales } from 'types/locales';

export type ExplorerRoutes =
  | '/'
  | '/nexus'
  | '/address'
  | '/block'
  | '/contract'
  | '/dao'
  | '/event'
  | '/platform'
  | '/oracle'
  | '/nft'
  | '/series'
  | '/search'
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
  | 'methods'
  | 'events'
  | 'oracles'
  | 'platforms'
  | 'instructions'
  | 'raw'
  | 'script'
  | 'series';

export type RouterParams = {
  id?: string;
  tab?: ExplorerTabs;
};

export type ExplorerRouter = {
  [key in ExplorerRoutes]: (locale: Locales, params?: RouterParams) => string;
};
