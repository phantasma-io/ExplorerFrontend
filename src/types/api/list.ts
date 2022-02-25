export type WithOption = 0 | 1;

export interface ListParams {
  order_by?: string;
  order_direction?: 'asc' | 'desc';
  offset?: number;
  limit?: number;
  with_total?: WithOption;
}

export interface ListResults {
  total_results?: number;
}
