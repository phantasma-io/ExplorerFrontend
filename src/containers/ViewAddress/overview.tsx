import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import csvDownload from 'json-to-csv-export';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, Grid, Button } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useAddressData } from 'hooks/api';
import { AddressResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { AddressBalances } from './balances';

export interface AddressOverviewProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressOverview = ({
  data,
  loading,
  error,
}: AddressOverviewProps) => {
  const { echo } = useEcho();

  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useAddressData(data);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (rows.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Grid container>
        <Grid item xs={12} lg={10}>
          <Box>{data && renderOverview(cols, rows)}</Box>
        </Grid>
        <Grid item xs={12} lg={2}>
          <Box textAlign="right" pt={{ xs: 1.5, lg: 0 }}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<FileDownloadIcon />}
              onClick={() =>
                csvDownload(
                  [raw[0]],
                  `PhantasmaExplorer-Address-${nanoid()}.csv`,
                  ',',
                )
              }
            >
              {echo('table-exportCsv')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} lg={10}>
          <Box>{data && <AddressBalances data={data} />}</Box>
        </Grid>
      </Grid>
    );
  }, [loading, error, rows, data, renderOverview, cols, echo, raw]);

  return <Box p={1}>{content}</Box>;
};
