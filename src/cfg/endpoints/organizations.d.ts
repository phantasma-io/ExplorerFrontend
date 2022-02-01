interface Dao {
  name?: string;
  addresses?: Address[];
}

interface DaoParams extends ListParams {
  name?: string;
}

interface DaoResults extends ListResults {
  organizations?: Dao[];
}
