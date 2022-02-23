import React, { useMemo } from 'react';
import { Box, Grid, NoSsr } from '@mui/material';
import { TableEncoder } from './Encoder';
import { TablePageSize } from './PageSize';
import { TablePagination } from './Pagination';
import { TableParams } from '../../../types/table';

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

  const pageCount = useMemo(
    () => Math.floor(total / pageSize),
    [pageSize, total],
  );

  const options = useMemo(() => [25, 50, 100], []);

  return (
    <Box>
      <NoSsr>
        <TableEncoder params={params} />
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
          <Grid item xs={12} md="auto">
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <TablePageSize
                  options={options}
                  pageSize={pageSize}
                  pageSizeSet={pageSizeSet}
                  total={total}
                />
              </Grid>
              {/* <Grid item></Grid> */}
              {/* <Grid item></Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12} md="auto">
            <TablePagination
              page={page}
              pageCount={pageCount}
              pageSet={pageSet}
            />
          </Grid>
        </Grid>
      </NoSsr>
    </Box>
  );
};
