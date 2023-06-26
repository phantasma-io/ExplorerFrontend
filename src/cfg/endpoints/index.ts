import { objToQuery } from 'scripts/objQuery';
import { ExplorerApi, ApiParams } from 'types/endpoints';

const parseParams = (params: ApiParams | undefined) =>
  params ? objToQuery(params) : '';

const testnet = process.env.NEXT_PUBLIC_TESTNET === 'testnet';

export const url = `https://${testnet ? 'testnet' : 'ngexplorer'}.phantasma.io${
  testnet ? '' : ''
}/api/v1`;

export const endpoints: ExplorerApi = {
  '/addresses': (params) => `${url}/addresses${parseParams(params)}`,
  '/blocks': (params) => `${url}/blocks${parseParams(params)}`,
  '/chains': (params) => `${url}/chains${parseParams(params)}`,
  '/contracts': (params) => `${url}/contracts${parseParams(params)}`,
  '/instructions': (params) => `${url}/instructions${parseParams(params)}`,
  '/eventkinds': (params) => `${url}/eventkinds${parseParams(params)}`,
  '/events': (params) => `${url}/events${parseParams(params)}`,
  '/nfts': (params) => `${url}/nfts${parseParams(params)}`,
  '/oracles': (params) => `${url}/oracles${parseParams(params)}`,
  '/organizations': (params) => `${url}/organizations${parseParams(params)}`,
  '/platforms': (params) => `${url}/platforms${parseParams(params)}`,
  '/historyprices': (params) => `${url}/historyprices${parseParams(params)}`,
  '/series': (params) => `${url}/series${parseParams(params)}`,
  '/searches': (params) => `${url}/searches${parseParams(params)}`,
  '/tokens': (params) => `${url}/tokens${parseParams(params)}`,
  '/transactions': (params) => `${url}/transactions${parseParams(params)}`,
};
