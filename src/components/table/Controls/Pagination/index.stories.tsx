import React, { useState, useMemo } from 'react';
import { Story, Meta } from '@storybook/react';
import { Grid } from '@mui/material';
import { TablePagination, TablePaginationProps } from '.';
import { TablePageSize } from '../PageSize';

export default {
  title: 'Components/Table/Pagination',
  component: TablePagination,
  parameters: {
    componentSubtitle: 'Table Pagination Component',
  },
} as Meta;

export const Default: Story<TablePaginationProps> = () => {
  const [page, pageSet] = useState(1);
  const [pageSize] = useState(25);

  const pageCount = useMemo(() => Math.floor(1000 / pageSize), [pageSize]);

  return (
    <TablePagination page={page} pageSet={pageSet} pageCount={pageCount} />
  );
};

export const WithPageSize: Story<TablePaginationProps> = () => {
  const [page, pageSet] = useState(1);
  const options = [25, 50, 100];
  const [pageSize, pageSizeSet] = useState(options[0]);
  const [total] = useState(1000);

  const pageCount = useMemo(
    () => Math.floor(total / pageSize),
    [pageSize, total],
  );

  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <TablePagination page={page} pageSet={pageSet} pageCount={pageCount} />
      </Grid>
      <Grid item>
        <TablePageSize
          pageSize={pageSize}
          pageSizeSet={pageSizeSet}
          options={options}
          total={total}
        />
      </Grid>
    </Grid>
  );
};
