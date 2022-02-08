import React, { useCallback } from 'react';
import { Box, Grid, GridSpacing, Typography } from '@mui/material';
import { CellText } from './cells';
import { TableDisplayData, TableDisplayCol, TableDisplayCell } from './types';

export interface TableDisplayDesktopProps extends TableDisplayData {
  maxHeight?: string;
  spacing?: GridSpacing;
}

export const TableDisplayDesktop = ({
  rows,
  cols,
  maxHeight,
  spacing = 1,
}: TableDisplayDesktopProps) => {
  const renderCell = useCallback(
    (type: TableDisplayCol['cell'], value: TableDisplayCell) => {
      switch (type) {
        case 'text':
        default:
          return <CellText value={value as string} />;
      }
    },
    [],
  );

  return (
    <Box sx={{ maxHeight }}>
      {/* header */}
      <Box pb={1}>
        <Grid container spacing={spacing}>
          {cols.map((col: TableDisplayCol) => (
            <Grid item xs={col.size} key={col.label}>
              <Box>
                <Typography variant="body1" fontWeight={600}>
                  {col.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* body */}
      <Box>
        <Grid container spacing={spacing}>
          {rows.map((cell: TableDisplayCell, idx) => (
            <Grid item xs={cols[idx].size} key={`${cols[idx].label}-${cell}`}>
              <Box>{renderCell(cols[idx].cell, cell)}</Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
