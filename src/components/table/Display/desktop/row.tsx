import React, { useState, useCallback } from 'react';
import { Box, Grid, GridSpacing } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useDarkMode } from '../../../../hooks';
import {
  TableDisplayRow,
  TableDisplayCol,
  TableDisplayCell,
} from '../../../../types/table';

export interface TableRowProps {
  row: TableDisplayRow;
  cols: TableDisplayCol[];
  spacing?: GridSpacing;
  hasClick?: boolean;
  openDialog: (row: TableDisplayRow) => void;
  renderCell: (
    type: TableDisplayCol['cell'],
    value: TableDisplayCell,
  ) => JSX.Element | null;
}

export const TableRow = ({
  cols,
  row,
  spacing,
  hasClick = false,
  openDialog,
  renderCell,
}: TableRowProps) => {
  const { furyActive } = useFury();
  const { isDark } = useDarkMode();

  const [isHover, isHoverSet] = useState<boolean>(false);

  const shouldOpenDialog = useCallback(() => {
    if (hasClick) {
      openDialog(row);
    }
  }, [hasClick, openDialog, row]);

  return (
    <Box
      py={0.81}
      onMouseEnter={() => isHoverSet(true)}
      onMouseLeave={() => isHoverSet(false)}
      style={{
        backgroundColor:
          !isDark && isHover ? '#e5e5e5' : furyActive.palette.background.paper,
        backgroundImage:
          isDark && isHover
            ? undefined
            : `linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))`,
        cursor: hasClick ? 'pointer' : 'default',
        borderBottom: `1px solid ${furyActive.palette.divider}`,
      }}
      onClick={shouldOpenDialog}
    >
      <Grid container spacing={spacing}>
        {row.map((cell: TableDisplayCell, idx) => (
          <Grid item xs={cols[idx].size} key={`${cols[idx].label}-${cell}`}>
            <Box px={1}>{renderCell(cols[idx].cell, cell)}</Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
