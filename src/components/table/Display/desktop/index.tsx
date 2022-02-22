import React, { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, GridSpacing, Typography, Button } from '@mui/material';
import { CellText, CellNumber } from '../cells';
import {
  TableDisplayData,
  TableDisplayRow,
  TableDisplayCol,
  TableDisplayCell,
  DetailSchema,
} from '../types';
import { Dialog } from '../../../layout/Dialog';
import { TABLE_HEIGHT } from '../../../../cfg';
import { TableRow } from './row';

export interface TableDisplayDesktopProps extends TableDisplayData {
  maxHeight?: string;
  spacing?: GridSpacing;
  withDetails?: DetailSchema;
}

export const TableDisplayDesktop = ({
  rows,
  cols,
  maxHeight = TABLE_HEIGHT,
  spacing = 1,
  withDetails = undefined,
}: TableDisplayDesktopProps) => {
  const { echo } = useEcho();
  const { furyActive } = useFury();

  const [dialogOpen, dialogOpenSet] = useState(false);
  const [selectedRow, selectedRowSet] = useState<TableDisplayRow | undefined>(
    undefined,
  );
  const openDialog = useCallback(
    (row: TableDisplayRow) => {
      selectedRowSet(row);
      dialogOpenSet(true);
    },
    [dialogOpenSet, selectedRowSet],
  );
  const closeDialog = useCallback(() => dialogOpenSet(false), [dialogOpenSet]);

  const renderCell = useCallback(
    (type: TableDisplayCol['cell'], value: TableDisplayCell) => {
      if (value) {
        switch (type) {
          case 'number':
            return <CellNumber value={value as number} />;
          case 'text':
          default:
            return <CellText value={value as string} />;
        }
      }
      return null;
    },
    [],
  );

  const renderDetails = useCallback(() => {
    if (selectedRow) {
      return (
        <Box py={spacing}>
          <Grid spacing={spacing} container>
            {cols.map((col, i) => (
              <Grid
                container
                spacing={spacing}
                key={nanoid()}
                item
                xs={12}
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="body2" fontWeight={600}>
                    {`${col.label}:`}
                  </Typography>
                </Grid>
                <Grid item>{renderCell(col.cell, selectedRow[i])}</Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    }

    return null;
  }, [cols, selectedRow, renderCell, spacing]);

  const renderActions = useCallback(() => {
    if (withDetails) {
      switch (withDetails.action) {
        case 'close':
        default:
          return (
            <Box>
              <Button onClick={closeDialog} color="inherit">
                {echo('close')}
              </Button>
            </Box>
          );
      }
    }

    return null;
  }, [withDetails, echo, closeDialog]);

  return (
    <Box>
      {/* header */}
      <Box
        py={1}
        style={{ borderBottom: `2px solid ${furyActive.palette.divider}` }}
      >
        <Grid container>
          {cols.map((col: TableDisplayCol) => (
            <Grid item xs={col.size} key={`${col.label}-col`}>
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
      <Box style={{ overflow: 'auto', maxHeight }}>
        {rows.map((row) => (
          <TableRow
            row={row}
            spacing={spacing}
            cols={cols}
            key={nanoid()}
            hasClick={!!withDetails}
            openDialog={openDialog}
            renderCell={renderCell}
          />
        ))}
      </Box>

      {/* dialog */}
      {withDetails && (
        <Dialog
          isOpen={dialogOpen}
          handleClose={closeDialog}
          title={withDetails.title}
          actions={renderActions()}
        >
          {renderDetails()}
        </Dialog>
      )}
    </Box>
  );
};
