import React, { useState, useCallback, useMemo } from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { nanoid } from 'nanoid';
import { Box, Grid, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'components/display';
import { Dialog, Loading, Empty, Error } from 'components/layout';
import { routes } from 'cfg';
import {
  TableDisplayProps,
  TableDisplayRow,
  TableDisplayCol,
} from 'types/table';
import { Locales } from 'types/locales';
import csvDownload from 'json-to-csv-export';
import { useRenderDetails, useI18n } from 'hooks';
import { AddressBalances } from 'containers/ViewAddress/balances';
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
  loading,
  error,
}: TableDisplayProps) => {
  const { t, locale } = useI18n();
  const theme = useTheme();

  const isSuccess = useMemo(() => !loading && !error, [loading, error]);

  const renderDialogDetails = useRenderDetails();
  const buildRowKey = useCallback(
    (row: TableDisplayRow, rawRow?: Record<string, unknown>) => {
      const primaryValue =
        linkOptions && rawRow
          ? rawRow[linkOptions.key as keyof typeof rawRow]
          : undefined;
      const firstValue = row?.[0];
      return `${tableId}-${primaryValue ?? firstValue ?? 'row'}`;
    },
    [linkOptions, tableId],
  );

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

  const renderDialogContent = useCallback(() => {
    if (selectedRow) {
      return (
        <Box py={spacing}>
          <Grid spacing={spacing} container>
            {cols.map((col, i) =>
              selectedRow[i] ? (
                <Grid
                  container
                  spacing={spacing}
                  key={`${tableId}-dialog-${col.id}`}
                  item
                  xs={12}
                  alignItems="center"
                >
                  <Grid item container>
                    {renderDialogDetails(
                      col.type,
                      selectedRow[i],
                      col.label,
                      col.linkOptions,
                    )}
                  </Grid>
                </Grid>
              ) : null,
            )}
            {selectedRowIndex !== undefined && raw[selectedRowIndex]?.balances && (
              <Grid item xs={12}>
                <Box>
                  <AddressBalances address={raw[selectedRowIndex]} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      );
    }

    return null;
  }, [
    cols,
    selectedRow,
    renderDialogDetails,
    spacing,
    raw,
    selectedRowIndex,
    tableId,
  ]);

  const renderDialogActions = useCallback(() => {
    if (withDetails) {
      return (
        <Box>
          <Grid container alignItems="center" spacing={1.5}>
            {selectedRowIndex !== undefined && (
              <Grid item>
                <Button
                  endIcon={<FileDownloadIcon />}
                  onClick={() =>
                    csvDownload([raw[selectedRowIndex]], csvFilename, ',')
                  }
                >
                  {t('table-exportCsv')}
                </Button>
              </Grid>
            )}
            {selectedRowIndex !== undefined &&
              raw[selectedRowIndex] &&
              linkOptions && (
                <Grid item>
                  <Link
                    href={routes[linkOptions.route](locale as Locales, {
                      id: raw[selectedRowIndex][linkOptions.key],
                    })}
                    title={linkOptions.title}
                  >
                    <Button
                      onClick={closeDialog}
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForwardIosIcon />}
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
    t,
    locale,
    closeDialog,
    raw,
    csvFilename,
    selectedRowIndex,
    linkOptions,
  ]);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    if (!rows || rows?.length === 0) {
      return <Empty />;
    }

    if (isSuccess && rows) {
      return rows.map((row, i) => {
        const rowKey = buildRowKey(row, raw[i]);
        return (
          <TableRow
            index={i}
            raw={raw[i]}
            row={row}
            spacing={spacing}
            cols={cols}
            key={rowKey}
            hasClick={!!withDetails}
            openDialog={openDialog}
            linkOptions={linkOptions}
          />
        );
      });
    }

    return null;
  }, [
    buildRowKey,
    cols,
    error,
    isSuccess,
    linkOptions,
    loading,
    openDialog,
    raw,
    rows,
    spacing,
    withDetails,
  ]);

  return (
    <Box>
      {/* header */}
      <Box
        py={1}
        style={{ borderBottom: `2px solid ${theme.palette.divider}` }}
      >
        <Grid container>
          {cols.map((col: TableDisplayCol) => {
            if (col.showDesktop) {
              return (
                <Grid item xs={col.size} key={`${col.label}-col`}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>
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
      <Box sx={{ overflow: 'auto', height }}>{content}</Box>

      {/* dialog */}
      {withDetails && (
        <Dialog
          isOpen={dialogOpen}
          handleClose={closeDialog}
          title={dialogOptions ? dialogOptions.title : t('details')}
          actions={renderDialogActions()}
        >
          {renderDialogContent()}
        </Dialog>
      )}
    </Box>
  );
};
