export interface TableDisplayCol {
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  label: string;
  cell: 'text' | 'number' | 'link' | 'date';
}

export type TableDisplayCell = string | number;

export type TableDisplayRow = TableDisplayCell[];

export interface TableDisplayData {
  rows: TableDisplayRow[];
  cols: TableDisplayCol[];
}
