import { objToQuery } from '../../scripts/objQuery';
import { localesKeys, Locales } from '../locales';

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
  | 'script'
  | 'members';

type RouterParams = {
  id?: string;
  tab?: ExplorerTabs;
};

type ExplorerRouter = {
  [key in ExplorerRoutes]: (locale: Locales, params?: RouterParams) => string;
};

export const routes: ExplorerRouter = {
  '/': (locale) => `/${locale}`,
  '/nexus': (locale) => `/${locale}/nexus`,
  '/chain': (locale, params) =>
    `/${locale}/chain${params ? objToQuery(params) : ''}`,
  '/address': (locale, params) =>
    `/${locale}/address${params ? objToQuery(params) : ''}`,
  '/block': (locale, params) =>
    `/${locale}/block${params ? objToQuery(params) : ''}`,
  '/contract': (locale, params) =>
    `/${locale}/contract${params ? objToQuery(params) : ''}`,
  '/dao': (locale, params) =>
    `/${locale}/dao${params ? objToQuery(params) : ''}`,
  '/token': (locale, params) =>
    `/${locale}/token${params ? objToQuery(params) : ''}`,
  '/transaction': (locale, params) =>
    `/${locale}/transaction${params ? objToQuery(params) : ''}`,
};

export const routesKeys = Object.keys(routes);

export const routesViews = routesKeys.map((key) =>
  key.substring(1, key.length),
);

export const routesHome = (() => localesKeys.map((key) => `/${key}`))();
