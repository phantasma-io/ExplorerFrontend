import { objToQuery } from 'scripts/objQuery';
import { ExplorerApi, ApiParams } from 'types/endpoints';

const parseParams = (params: ApiParams | undefined) =>
  params ? objToQuery(params as any) : '';

const testnet = process.env.NEXT_PUBLIC_TESTNET === 'testnet';

const fallbackUrl = `https://${testnet ? 'testnet-backend-explorer' : 'api-explorer'}.phantasma.info/api/v1`;
export const url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : fallbackUrl

export const endpoints: ExplorerApi = {
  '/blocks': (params) => `${url}/blocks${parseParams(params)}`,
  '/chains': (params) => `${url}/chains${parseParams(params)}`,
  '/contracts': (params) => `${url}/contracts${parseParams(params)}`,
  '/instructions': (params) => `${url}/instructions${parseParams(params)}`,
  '/eventkinds': (params) => `${url}/eventkinds${parseParams(params)}`,
  '/events': (params) => `${url}/events${parseParams(params)}`,
  '/nfts': (params) => `${url}/nfts${parseParams(params)}`,
  '/oracles': (params) => `${url}/oracles${parseParams(params)}`,
  '/organizations': (params) => `${url}/organizations${parseParams(params)}`,
  '/historyprices': (params) => `${url}/historyprices${parseParams(params)}`,
  '/series': (params) => `${url}/series${parseParams(params)}`,
  '/searches': (params) => `${url}/searches${parseParams(params)}`,
  '/tokens': (params) => `${url}/tokens${parseParams(params)}`,
  '/transactions': (params) => `${url}/transactions${parseParams(params)}`,
};
