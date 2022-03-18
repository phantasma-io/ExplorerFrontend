/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
import React from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { TableDisplayProps } from 'types/table';
import { useRenderDetails } from 'hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TableDisplayMobileProps
  extends Pick<TableDisplayProps, 'spacing' | 'cols' | 'rows' | 'height'> {}

export const TableDisplayMobile = ({
  spacing,
  cols,
  rows,
  height,
}: TableDisplayMobileProps) => {
  const { furyActive } = useFury();
  const renderDetails = useRenderDetails();

  return (
    <Box sx={{ overflow: 'auto', height }}>
      {rows &&
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
