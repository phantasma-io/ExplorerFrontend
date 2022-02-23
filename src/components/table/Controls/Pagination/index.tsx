import React from 'react';
import { numberFormat } from '@ricardo-jrm/dervish';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, IconButton, Button, Tooltip } from '@mui/material';
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
  const { echo } = useEcho();

  return (
    <Box>
      <Grid container spacing={0.6}>
        <Grid item>
          <Tooltip title={echo('table-firstpage')} placement="top">
            <IconButton
              size="small"
              onClick={() => pageSet(1)}
              disabled={page === 1}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={echo('table-prevpage')} placement="top">
            <IconButton
              size="small"
              onClick={() => pageSet(page - 1)}
              disabled={page === 1}
            >
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
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
          <Tooltip title={echo('table-nextpage')} placement="top">
            <IconButton
              size="small"
              onClick={() => pageSet(page + 1)}
              disabled={page === pageCount}
            >
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title={echo('table-lastpage')} placement="top">
            <IconButton
              size="small"
              onClick={() => pageSet(pageCount)}
              disabled={page === pageCount}
            >
              <ChevronRightIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
