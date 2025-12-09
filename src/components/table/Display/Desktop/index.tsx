import React, { useMemo } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useThemeMode } from 'containers/ThemeProvider';
import { Loading, Empty, Error } from 'components/layout';
import { TableDisplayProps, TableDisplayCol } from 'types/table';
import { TableRow } from './row';

export const TableDisplayDesktop = ({
  tableId,
  raw,
  rows,
  cols,
  height,
  spacing,
  linkOptions,
  loading,
  error,
}: TableDisplayProps) => {
  const { themeActive } = useThemeMode();

  const isSuccess = useMemo(() => !loading && !error, [loading, error]);

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
      return rows.map((row, i) => (
        <TableRow
          raw={raw[i]}
          row={row}
          spacing={spacing}
          cols={cols}
          key={`${tableId}-row-${i}`}
          clickable={!!linkOptions}
          linkOptions={linkOptions}
        />
      ));
    }

    return null;
  }, [
    cols,
    error,
    isSuccess,
    linkOptions,
    loading,
    raw,
    rows,
    spacing,
    tableId,
  ]);

  return (
    <Box>
      {/* header */}
      <Box
        py={1}
        style={{ borderBottom: `2px solid ${themeActive.palette.divider}` }}
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
    </Box>
  );
};
