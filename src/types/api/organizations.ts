import { ListParams, ListResults } from './list';
import { Address } from './addresses';

export interface Dao {
  name?: string;
  addresses?: Address[];
}

export interface DaoParams extends ListParams {
  name?: string;
}

export interface DaoResults extends ListResults {
  organizations?: Dao[];
}
