import { objToQuery } from 'scripts/objQuery';
import { localesKeys } from 'cfg/locales';
import { ExplorerRouter } from 'types/routes';

export const routes: ExplorerRouter = {
  '/': (locale) => `/${locale}`,
  '/nexus': (locale, params) =>
    `/${locale}/nexus${params ? objToQuery(params) : ''}`,
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
