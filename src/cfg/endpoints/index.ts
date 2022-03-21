import { objToQuery } from 'scripts/objQuery';
import { ExplorerApi } from 'types/endpoints';

export const url = 'https://api.phantasma.io:8001/api/v1';

export const endpoints: ExplorerApi = {
  '/addresses': (params) =>
    `${url}/addresses${params ? objToQuery(params) : ''}`,
  '/blocks': (params) => `${url}/blocks${params ? objToQuery(params) : ''}`,
  '/chains': (params) => `${url}/chains${params ? objToQuery(params) : ''}`,
  '/contracts': (params) =>
    `${url}/contracts${params ? objToQuery(params) : ''}`,
  '/instructions': (params) =>
    `${url}/instructions${params ? objToQuery(params) : ''}`,
  '/eventkinds': (params) =>
    `${url}/eventkinds${params ? objToQuery(params) : ''}`,
  '/events': (params) => `${url}/events${params ? objToQuery(params) : ''}`,
  '/nfts': (params) => `${url}/nfts${params ? objToQuery(params) : ''}`,
  '/organizations': (params) =>
    `${url}/organizations${params ? objToQuery(params) : ''}`,
  '/platforms': (params) =>
    `${url}/platforms${params ? objToQuery(params) : ''}`,
  '/historyprices': (params) =>
    `${url}/historyprices${params ? objToQuery(params) : ''}`,
  '/series': (params) => `${url}/series${params ? objToQuery(params) : ''}`,
  '/tokens': (params) => `${url}/tokens${params ? objToQuery(params) : ''}`,
  '/transactions': (params) =>
    `${url}/transactions${params ? objToQuery(params) : ''}`,
};
