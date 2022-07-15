import { ListParams, ListResults, WithOption } from './list';
import { Address } from './addresses';
import { Token } from './tokens';

export interface Contract {
  name?: string;
  hash?: string;
  symbol?: string;
  address?: Address;
  script_raw?: string;
  token?: Token;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods?: any;
}

export interface ContractParams
  extends ListParams,
    Pick<Contract, 'symbol' | 'hash'> {
  with_methods?: WithOption;
  with_script?: WithOption;
  with_token?: WithOption;
  with_creation_event?: WithOption;
}

export interface ContractResults extends ListResults {
  contracts?: Contract[];
}
