interface Contract {
  name?: string;
  hash?: string;
  symbol?: string;
}

interface ContractParams extends ListParams, Pick<Contract, 'symbol'> {}

interface ContractResults extends ListResults {
  contracts?: Contract[];
}
