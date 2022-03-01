import React from 'react';
import { GridSpacing } from '@mui/material';

export type TableOrderDirection = 'asc' | 'desc';

export interface TableDisplayCol {
  id: string;
  label: string;
  cell: 'text' | 'number' | 'link' | 'date' | 'boolean';
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  showDesktop?: boolean;
}

export type TableDisplayCell = string | number | boolean | Date;

export type TableDisplayRow = TableDisplayCell[];

export interface TableDisplayData {
  rows: TableDisplayRow[];
  cols: TableDisplayCol[];
}

export interface TableUrlParams {
  total: number;
  page: number;
  pageSize: number;
  orderBy: string;
  orderDirection: TableOrderDirection;
  filters?: string;
}

export interface TableParamControls {
  pageSet: React.Dispatch<React.SetStateAction<number>>;
  pageSizeSet: React.Dispatch<React.SetStateAction<number>>;
  orderBySet: React.Dispatch<React.SetStateAction<string>>;
  orderDirectionSet: React.Dispatch<React.SetStateAction<TableOrderDirection>>;
}

export interface TableDisplayProps extends TableDisplayData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  tableId: string;
  height?: string;
  spacing?: GridSpacing;
  withDetails?: boolean;
}
