import React, { useEffect, useMemo } from 'react';
import { numberFormat } from '@ricardo-jrm/dervish';
import { Box, Grid, IconButton, Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface TablePaginationProps {
  page: number;
  pageSet: (page: number) => void;
  pageSize: number;
  total: number;
}

export const TablePagination = ({
  page,
  pageSet,
  pageSize,
  total,
}: TablePaginationProps) => {
  useEffect(() => pageSet(1), [pageSize, pageSet]);

  const pageCount = useMemo(
    () => Math.floor(total / pageSize),
    [pageSize, total],
  );

  return (
    <Box>
      <Grid container spacing={0.6}>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => pageSet(1)}
            disabled={page === 1}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => pageSet(page - 1)}
            disabled={page === 1}
          >
            <ArrowLeftIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <Button
            size="small"
            onClick={() => pageSet(page - 2)}
            sx={{
              minWidth: 30,
              visibility: page - 2 > 0 ? 'visible' : 'hidden',
            }}
            color="inherit"
          >
            {numberFormat(page - 2)}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="small"
            onClick={() => pageSet(page - 1)}
            sx={{
              minWidth: 30,
              visibility: page - 1 > 0 ? 'visible' : 'hidden',
            }}
            color="inherit"
          >
            {numberFormat(page - 1)}
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ minWidth: 30 }}
          >
            {numberFormat(page)}
          </Button>
        </Grid>

        <Grid item>
          <Button
            size="small"
            onClick={() => pageSet(page + 1)}
            sx={{
              minWidth: 30,
              visibility: page + 1 <= pageCount ? 'visible' : 'hidden',
            }}
            color="inherit"
          >
            {numberFormat(page + 1)}
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="small"
            onClick={() => pageSet(page + 2)}
            sx={{
              minWidth: 30,
              visibility: page + 2 <= pageCount ? 'visible' : 'hidden',
            }}
            color="inherit"
          >
            {numberFormat(page + 2)}
          </Button>
        </Grid>

        <Grid item>
          <IconButton
            size="small"
            onClick={() => pageSet(page + 1)}
            disabled={page === pageCount}
          >
            <ArrowRightIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => pageSet(pageCount)}
            disabled={page === pageCount}
          >
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
