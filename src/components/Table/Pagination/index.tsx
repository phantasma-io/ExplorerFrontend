import React, { useCallback } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface TablePaginationProps {
  page: number;
  pageSet: (page: number) => void;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const TablePagination = ({
  page,
  pageSet,
  pageSize,
  pageCount,
  total,
}: TablePaginationProps) => {
  const offsetPage = useCallback(
    (offset: number) => pageSet(page + offset),
    [page, pageSet],
  );

  console.log({ page, pageSize, pageCount, total });

  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => offsetPage(-1)}
            disabled={page === 1}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => offsetPage(1)}
            disabled={page === pageCount}
          >
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
