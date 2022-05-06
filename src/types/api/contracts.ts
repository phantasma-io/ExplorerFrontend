import { ListParams, ListResults } from './list';

export interface Contract {
  name?: string;
  hash?: string;
  symbol?: string;
}

export interface ContractParams
  extends ListParams,
    Pick<Contract, 'symbol' | 'hash'> {}

export interface ContractResults extends ListResults {
  contracts?: Contract[];
}
