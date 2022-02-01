interface Transaction {
  hash: string;
  blockHeight: string;
  index: number;
  events: EventResult[];
}

interface TransactionParams extends ListParams {
  hash?: string;
  with_nft?: number;
}

interface TransactionResults extends ListResults {
  transactions?: Transaction[];
}
