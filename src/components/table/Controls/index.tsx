import React, { useMemo } from 'react';
import { Box, Grid, NoSsr } from '@mui/material';
import { TableParams } from '../../../types/table';
import { TableEncoder } from '../Encoder';
import { TablePageSize } from '../PageSize';
import { TablePagination } from '../Pagination';

export interface TableControlsProps {
  page: number;
  pageSize: number;
  pageSet: React.Dispatch<React.SetStateAction<number>>;
  pageSizeSet: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

export const TableControls = ({
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  total,
}: TableControlsProps) => {
  const params = useMemo<TableParams>(
    () => ({ page, pageSize }),
    [page, pageSize],
  );

  return (
    <Box>
      <NoSsr>
        <TableEncoder params={params} />
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
          <Grid item xs={12} md="auto">
            <TablePageSize
              options={[25, 50, 100]}
              pageSize={pageSize}
              pageSizeSet={pageSizeSet}
            />
          </Grid>
          <Grid item xs={12} md="auto">
            <TablePagination
              page={page}
              pageSize={pageSize}
              pageSet={pageSet}
              total={total}
            />
          </Grid>
        </Grid>
      </NoSsr>
    </Box>
  );
};
