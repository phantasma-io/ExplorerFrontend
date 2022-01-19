import { objToQuery } from '../../scripts/objQuery';

type ExplorerRoutes =
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
  [key in ExplorerRoutes]: (params?: RouterParams) => string;
};

export const routes: ExplorerRouter = {
  '/': () => '/',
  '/nexus': () => '/nexus',
  '/chain': (params) => `/chain${params ? objToQuery(params) : ''}`,
  '/address': (params) => `/address${params ? objToQuery(params) : ''}`,
  '/block': (params) => `/block${params ? objToQuery(params) : ''}`,
  '/contract': (params) => `/contract${params ? objToQuery(params) : ''}`,
  '/dao': (params) => `/dao${params ? objToQuery(params) : ''}`,
  '/token': (params) => `/token${params ? objToQuery(params) : ''}`,
  '/transaction': (params) => `/transaction${params ? objToQuery(params) : ''}`,
};
