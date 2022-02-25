import React, { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, GridSpacing, IconButton, Tooltip } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useDarkMode } from 'hooks';
import {
  TableDisplayRow,
  TableDisplayCol,
  TableDisplayCell,
} from 'types/table';
import { useEcho } from '@ricardo-jrm/echo';
import csvDownload from 'json-to-csv-export';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export interface TableRowProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
  tableId: string;
  index: number;
  row: TableDisplayRow;
  cols: TableDisplayCol[];
  spacing?: GridSpacing;
  hasClick?: boolean;
  openDialog: (row: TableDisplayRow, index: number) => void;
  renderCell: (
    type: TableDisplayCol['cell'],
    value: TableDisplayCell,
  ) => JSX.Element | null;
}

export const TableRow = ({
  raw,
  tableId,
  index,
  cols,
  row,
  spacing,
  hasClick = false,
  openDialog,
  renderCell,
}: TableRowProps) => {
  const { echo } = useEcho();
  const { furyActive } = useFury();
  const { isDark } = useDarkMode();

  const [isHover, isHoverSet] = useState<boolean>(false);

  const shouldOpenDialog = useCallback(() => {
    if (hasClick) {
      openDialog(row, index);
    }
  }, [hasClick, openDialog, row, index]);

  const csvFilename = useMemo(() => `${tableId}-${nanoid}.csv`, [tableId]);

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
        {/* cols */}
        {row.map((cell: TableDisplayCell, idx) => {
          if (cols[idx].showDesktop) {
            return (
              <Grid item xs={cols[idx].size} key={`${cols[idx].label}-${cell}`}>
                <Box px={1}>{renderCell(cols[idx].cell, cell)}</Box>
              </Grid>
            );
          }
          return null;
        })}

        {/* actions */}
        <Grid item xs={1}>
          <Box px={1} textAlign="center">
            <Tooltip title={echo('table-exportCsv')} placement="top">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  csvDownload([raw], csvFilename, ',');
                }}
                color="primary"
              >
                <FileDownloadIcon
                  style={{
                    height: '15px',
                    width: 'auto',
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
