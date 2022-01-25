import React, { useState, useMemo } from 'react';
import { Story, Meta } from '@storybook/react';
import { TablePagination, TablePaginationProps } from '.';

export default {
  title: 'Table/Pagination',
  component: TablePagination,
  parameters: {
    componentSubtitle: 'Table Pagination Component',
  },
} as Meta;

export const Default: Story<TablePaginationProps> = () => {
  const [page, pageSet] = useState(1);
  const [pageSize] = useState(25);
  const [total] = useState(1000);

  const pageCount = useMemo(
    () => Math.floor(total / pageSize),
    [pageSize, total],
  );

  return (
    <TablePagination page={page} pageSet={pageSet} pageCount={pageCount} />
  );
};
