import { ListParams, ListResults } from './list';

export interface Contract {
  name?: string;
  hash?: string;
  symbol?: string;
}

export interface ContractParams extends ListParams, Pick<Contract, 'symbol'> {}

export interface ContractResults extends ListResults {
  contracts?: Contract[];
}
