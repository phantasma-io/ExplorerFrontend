/* eslint-disable @typescript-eslint/no-unused-vars */
import { objToQuery } from '../../scripts/objQuery';
import { localesKeys, Locales, localesDefault } from '../locales';

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

type RouterParams = {
  [x: string]: string | number;
};

type ExplorerRouter = {
  [key in ExplorerRoutes]: (params?: RouterParams, locale?: Locales) => string;
};

export const routes: ExplorerRouter = {
  '/': (params, locale = localesDefault) => `/${locale}/`,
  '/nexus': (params, locale = localesDefault) => `/${locale}/nexus`,
  '/chain': (params, locale = localesDefault) =>
    `/${locale}/chain${params ? objToQuery(params) : ''}`,
  '/address': (params, locale = localesDefault) =>
    `/${locale}/address${params ? objToQuery(params) : ''}`,
  '/block': (params, locale = localesDefault) =>
    `/${locale}/block${params ? objToQuery(params) : ''}`,
  '/contract': (params, locale = localesDefault) =>
    `/${locale}/contract${params ? objToQuery(params) : ''}`,
  '/dao': (params, locale = localesDefault) =>
    `/${locale}/dao${params ? objToQuery(params) : ''}`,
  '/token': (params, locale = localesDefault) =>
    `/${locale}/token${params ? objToQuery(params) : ''}`,
  '/transaction': (params, locale = localesDefault) =>
    `/${locale}/transaction${params ? objToQuery(params) : ''}`,
};

export const routesKeys = Object.keys(routes);

export const routesViews = routesKeys.map((key) =>
  key.substring(1, key.length),
);

export const routesHome = (() => localesKeys.map((key) => `/${key}`))();
