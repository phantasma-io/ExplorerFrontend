/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid } from '@mui/material';
import { useRenderDetails } from 'hooks/useRenderDetails';
import { TableDisplayCol, TableDisplayRow } from 'types/table';
import { AddressBalances } from 'containers/ViewAddress/balances';

export const useRenderOverview = () => {
  const renderDetails = useRenderDetails();

  const renderOverview = useCallback(
    (cols: TableDisplayCol[], rows: TableDisplayRow[], data?: any) => {
      return (
        <Box>
          <Grid spacing={1} container>
            {cols.map((col, i) =>
              rows[0][i] ? (
                <Grid
                  container
                  spacing={1}
                  key={nanoid()}
                  item
                  xs={12}
                  alignItems="center"
                >
                  <Grid item container>
                    {renderDetails(
                      col.type,
                      rows[0][i],
                      col.label,
                      !col.linkOptions?.primary ? col.linkOptions : undefined,
                    )}
                  </Grid>
                </Grid>
              ) : null,
            )}
            {data?.addresses[0]?.balances && (
              <Grid item xs={12}>
                <Box>
                  <AddressBalances data={data} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      );
    },
    [renderDetails],
  );

  return renderOverview;
};
