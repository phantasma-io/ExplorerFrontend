import React from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export interface TablePaginationProps {
  page: number;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const TablePagination = ({
  page,
  hasNext,
  onPrev,
  onNext,
}: TablePaginationProps) => {
  const { echo } = useEcho();

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 0, md: 0.6 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Tooltip title={echo('table-firstpage')} placement="top">
            <IconButton
              size="small"
              onClick={() => onPrev()}
              disabled={page === 1}
            >
              <ArrowLeftIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          <Typography variant="body2" fontWeight={700}>
            {echo('table-page')} {page}
          </Typography>
        </Grid>

        <Grid item>
          <Tooltip title={echo('table-nextpage')} placement="top">
            <IconButton
              size="small"
              onClick={onNext}
              disabled={!hasNext}
            >
              <ArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Box>
  );
};
