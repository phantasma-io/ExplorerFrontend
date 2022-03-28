import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { TableDisplayProps } from 'types/table';
import { useRenderDetails } from 'hooks';
import { Loading, Empty, Error } from 'components/layout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableDisplayMobileProps
  extends Pick<
    TableDisplayProps,
    'spacing' | 'cols' | 'rows' | 'height' | 'loading' | 'error'
  > {}

export const TableDisplayMobile = ({
  spacing,
  cols,
  rows,
  height,
  loading,
  error,
}: TableDisplayMobileProps) => {
  const { furyActive } = useFury();
  const renderDetails = useRenderDetails();

  const isSuccess = useMemo(() => !loading && !error, [loading, error]);

  return (
    <Box sx={{ overflow: 'auto', height }}>
      {rows.length === 0 && !loading && !error && <Empty />}
      {error && !loading && <Error />}
      {loading && <Loading />}
      {isSuccess &&
        rows &&
        rows.map((row) => (
          <Box
            key={nanoid()}
            py={spacing}
            sx={{ borderTop: `1px solid ${furyActive.palette.divider}` }}
          >
            <Grid spacing={spacing} container>
              {cols.map((col, i) =>
                row[i] ? (
                  <Grid
                    container
                    spacing={spacing}
                    key={nanoid()}
                    item
                    xs={12}
                    alignItems="center"
                  >
                    <Grid item container>
                      {renderDetails(
                        col.type,
                        row[i],
                        col.label,
                        col.linkOptions,
                      )}
                    </Grid>
                  </Grid>
                ) : null,
              )}
            </Grid>
          </Box>
        ))}
    </Box>
  );
};
