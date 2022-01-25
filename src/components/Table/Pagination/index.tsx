import React from 'react';

export interface TablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
}

export const TablePagination = ({
  page,
  pageSize,
  total,
}: TablePaginationProps) => {
  return <>TablePagination</>;
};
