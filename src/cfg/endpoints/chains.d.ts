interface Chain {
  chain_name?: string;
  chain_height?: string;
}

interface ChainParams {
  chain?: string;
}

interface ChainResults extends ListResults {
  chains?: Chain[];
}
