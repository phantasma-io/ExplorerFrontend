import React, { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Dialog } from 'components/layout';
import {
  TableDisplayProps,
  TableDisplayRow,
  TableDisplayCol,
  TableDisplayCell,
} from 'types/table';
import csvDownload from 'json-to-csv-export';
import { TableRow } from './row';
import { CellText, CellNumber } from '../../Cells';

export const TableDisplayDesktop = ({
  tableId,
  raw,
  rows,
  cols,
  height,
  spacing,
  withDetails,
}: TableDisplayProps) => {
  const { echo } = useEcho();
  const { furyActive } = useFury();

  const [dialogOpen, dialogOpenSet] = useState(false);
  const [selectedRow, selectedRowSet] = useState<TableDisplayRow | undefined>(
    undefined,
  );
  const [selectedRowIndex, selectedRowIndexSet] = useState<number | undefined>(
    undefined,
  );
  const openDialog = useCallback(
    (row: TableDisplayRow, index: number) => {
      selectedRowSet(row);
      selectedRowIndexSet(index);
      dialogOpenSet(true);
    },
    [dialogOpenSet, selectedRowSet],
  );
  const closeDialog = useCallback(() => dialogOpenSet(false), [dialogOpenSet]);

  const csvFilename = useMemo(() => `${tableId}-${nanoid()}.csv`, [tableId]);

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
      return (
        <Box>
          <Grid container alignItems="center" spacing={1}>
            {selectedRowIndex !== undefined && (
              <Grid item>
                <Button
                  onClick={() =>
                    csvDownload([raw[selectedRowIndex]], csvFilename, ',')
                  }
                >
                  {echo('table-exportCsv')}
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button onClick={closeDialog} color="inherit">
                {echo('close')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      );
    }

    return null;
  }, [withDetails, echo, closeDialog, raw, csvFilename, selectedRowIndex]);

  return (
    <Box>
      {/* header */}
      <Box
        py={1}
        style={{ borderBottom: `2px solid ${furyActive.palette.divider}` }}
      >
        <Grid container>
          {cols.map((col: TableDisplayCol) => {
            if (col.showDesktop) {
              return (
                <Grid item xs={col.size} key={`${col.label}-col`}>
                  <Box>
                    <Typography variant="body1" fontWeight={600}>
                      {col.label}
                    </Typography>
                  </Box>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
      </Box>

      {/* body */}
      <Box style={{ overflow: 'auto', height }}>
        {rows.map((row, i) => (
          <TableRow
            tableId={tableId}
            index={i}
            raw={raw[i]}
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
          title={echo('details')}
          actions={renderActions()}
        >
          {renderDetails()}
        </Dialog>
      )}
    </Box>
  );
};
