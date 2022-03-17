/* eslint-disable operator-linebreak */
/* eslint-disable no-confusing-arrow */
import React, { useState, useCallback, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, Typography, Button } from '@mui/material';
import { Link } from 'components/display';
import { Dialog } from 'components/layout';
import { routes } from 'cfg';
import {
  TableDisplayProps,
  TableDisplayRow,
  TableDisplayCol,
} from 'types/table';
import { Locales } from 'types/locales';
import csvDownload from 'json-to-csv-export';
import { useRenderDetails } from 'hooks';
import { TableRow } from './row';

export const TableDisplayDesktop = ({
  tableId,
  raw,
  rows,
  cols,
  height,
  spacing,
  withDetails,
  linkOptions,
  dialogOptions,
}: TableDisplayProps) => {
  const { echo, echoActiveId } = useEcho();
  const { furyActive } = useFury();

  const renderCell = useRenderDetails();

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

  const renderDetails = useCallback(() => {
    if (selectedRow) {
      return (
        <Box py={spacing}>
          <Grid spacing={spacing} container>
            {cols.map((col, i) =>
              selectedRow[i] ? (
                <Grid
                  container
                  spacing={spacing}
                  key={nanoid()}
                  item
                  xs={12}
                  alignItems="center"
                >
                  <Grid item container>
                    {renderCell(
                      col.type,
                      selectedRow[i],
                      col.label,
                      col.linkOptions,
                    )}
                  </Grid>
                </Grid>
              ) : null,
            )}
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
            {/* <Grid item>
              <Button onClick={closeDialog} color="inherit">
                {echo('close')}
              </Button>
            </Grid> */}
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
            {selectedRowIndex !== undefined &&
              raw[selectedRowIndex] &&
              linkOptions && (
                <Grid item>
                  <Link
                    href={routes[linkOptions.route](echoActiveId as Locales, {
                      id: raw[selectedRowIndex][linkOptions.key],
                    })}
                    title={linkOptions.title}
                  >
                    <Button
                      onClick={closeDialog}
                      variant="contained"
                      color="primary"
                    >
                      {linkOptions.title}
                    </Button>
                  </Link>
                </Grid>
              )}
          </Grid>
        </Box>
      );
    }

    return null;
  }, [
    withDetails,
    echo,
    echoActiveId,
    closeDialog,
    raw,
    csvFilename,
    selectedRowIndex,
    linkOptions,
  ]);

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
            linkOptions={linkOptions}
          />
        ))}
      </Box>

      {/* dialog */}
      {withDetails && (
        <Dialog
          isOpen={dialogOpen}
          handleClose={closeDialog}
          title={dialogOptions ? dialogOptions.title : echo('details')}
          actions={renderActions()}
        >
          {renderDetails()}
        </Dialog>
      )}
    </Box>
  );
};
