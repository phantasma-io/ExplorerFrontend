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
