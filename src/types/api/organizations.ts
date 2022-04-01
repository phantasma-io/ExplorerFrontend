import { ListParams, ListResults } from './list';

export interface Dao {
  name?: string;
}

export interface DaoParams extends ListParams {
  organization_name?: string;
  organization_name_partial?: string;
}

export interface DaoResults extends ListResults {
  organizations?: Dao[];
}
