type ExplorerEndpoints =
  | '/addresses'
  | '/chains'
  | '/contracts'
  | '/instructions'
  | '/eventkinds'
  | '/events'
  | '/nfts'
  | '/series'
  | '/tokens'
  | '/transactions';

interface ListParams {
  order_by?: string;
  order_direction?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
  // with_total?: number;
}
interface ListResults {
  total_results?: number;
}
