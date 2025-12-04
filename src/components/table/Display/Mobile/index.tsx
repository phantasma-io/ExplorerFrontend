import React, { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
  const renderDetails = useRenderDetails();

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
      return rows.map((row) => {
        const rowKey = `${row[0] ?? row.join('-') ?? 'row'}`;
        return (
          <Box
            key={`row-${rowKey}`}
            py={2}
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          >
            <Grid spacing={spacing} container>
              {cols.map((col, i) =>
                row[i] ? (
                  <Grid
                    container
                    spacing={spacing}
                    key={`${col.id}-${rowKey}`}
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
        );
      });
    }

    return null;
  }, [
    cols,
    error,
    isSuccess,
    loading,
    rows,
    spacing,
    renderDetails,
    theme,
  ]);

  return <Box sx={{ overflow: 'auto', height }}>{content}</Box>;
};
