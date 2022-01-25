import React from 'react';
import { Story, Meta } from '@storybook/react';
import { TablePagination, TablePaginationProps } from '.';

export default {
  title: 'Table/Pagination',
  component: TablePagination,
  parameters: {
    componentSubtitle: 'Table Pagination Component',
  },
} as Meta;

export const Default: Story<TablePaginationProps> = () => (
  <TablePagination page={1} pageSize={25} total={100} />
);
