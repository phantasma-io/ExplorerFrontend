import { objToQuery } from 'scripts/objQuery';
import { localesKeys } from 'cfg/locales';
import { ExplorerRouter, RouterParams } from 'types/routes';

const parseParams = (params: RouterParams | undefined) =>
  params ? objToQuery(params) : '';

export const routes: ExplorerRouter = {
  '/': (locale) => `/${locale}`,
  '/nexus': (locale, params) => `/${locale}/nexus${parseParams(params)}`,
  '/address': (locale, params) => `/${locale}/address${parseParams(params)}`,
  '/block': (locale, params) => `/${locale}/block${parseParams(params)}`,
  '/contract': (locale, params) => `/${locale}/contract${parseParams(params)}`,
  '/dao': (locale, params) => `/${locale}/dao${parseParams(params)}`,
  '/event': (locale, params) => `/${locale}/event${parseParams(params)}`,
  '/platform': (locale, params) => `/${locale}/platform${parseParams(params)}`,
  '/nft': (locale, params) => `/${locale}/nft${parseParams(params)}`,
  '/series': (locale, params) => `/${locale}/series${parseParams(params)}`,
  '/search': (locale, params) => `/${locale}/search${parseParams(params)}`,
  '/token': (locale, params) => `/${locale}/token${parseParams(params)}`,
  '/transaction': (locale, params) =>
    `/${locale}/transaction${parseParams(params)}`,
};

export const routesKeys = Object.keys(routes);

export const routesViews = routesKeys.map((key) =>
  key.substring(1, key.length),
);

export const routesHome = (() => localesKeys.map((key) => `/${key}`))();
