import React from 'react';
import { nanoid } from 'nanoid';
import csvDownload from 'json-to-csv-export';
import { Box, Grid, Button } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useAddressData } from 'hooks/api';
import { AddressResults } from 'types/api';

export interface AddressOverviewProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressOverview = ({ data }: AddressOverviewProps) => {
  const { echo } = useEcho();

  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useAddressData(data);

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={12} lg={10}>
          <Box>{data && renderOverview(cols, rows)}</Box>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Box textAlign="right" pt={{ xs: 1.5, lg: 0 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                csvDownload(
                  [raw[0]],
                  `PhantasmaExplorer-Address-${nanoid()}`,
                  ',',
                )
              }
            >
              {echo('table-exportCsv')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
