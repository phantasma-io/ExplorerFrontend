import React from 'react';
import { numberFormat } from '@ricardo-jrm/dervish';
import { Box, Grid, IconButton, Button } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface TablePaginationProps {
  page: number;
  pageSet: (page: number) => void;
  pageCount: number;
}

export const TablePagination = ({
  page,
  pageSet,
  pageCount,
}: TablePaginationProps) => {
  return (
    <Box>
      <Grid container spacing={1}>
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

        {page - 2 > 0 && (
          <Grid item>
            <Button
              size="small"
              onClick={() => pageSet(page - 2)}
              sx={{ minWidth: 30 }}
              color="inherit"
            >
              {numberFormat(page - 2)}
            </Button>
          </Grid>
        )}
        {page - 1 > 0 && (
          <Grid item>
            <Button
              size="small"
              onClick={() => pageSet(page - 1)}
              sx={{ minWidth: 30 }}
              color="inherit"
            >
              {numberFormat(page - 1)}
            </Button>
          </Grid>
        )}

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

        {page + 1 <= pageCount && (
          <Grid item>
            <Button
              size="small"
              onClick={() => pageSet(page + 1)}
              sx={{ minWidth: 30 }}
              color="inherit"
            >
              {numberFormat(page + 1)}
            </Button>
          </Grid>
        )}
        {page + 2 <= pageCount && (
          <Grid item>
            <Button
              size="small"
              onClick={() => pageSet(page + 2)}
              sx={{ minWidth: 30 }}
              color="inherit"
            >
              {numberFormat(page + 2)}
            </Button>
          </Grid>
        )}

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
