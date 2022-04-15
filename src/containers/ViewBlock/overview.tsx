import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import csvDownload from 'json-to-csv-export';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, Button } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useBlockData } from 'hooks/api';
import { BlockResults } from 'types/api';
import { Error, Empty, Loading } from 'components/layout';

export interface BlockOverviewProps {
  data?: BlockResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const BlockOverview = ({ data, error, loading }: BlockOverviewProps) => {
  const { echo } = useEcho();

  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useBlockData(data);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error) {
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
                  `PhantasmaExplorer-Block-${nanoid()}.csv`,
                  ',',
                )
              }
            >
              {echo('table-exportCsv')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    );
  }, [loading, error, rows, data, renderOverview, cols, echo, raw]);

  return <Box p={1}>{content}</Box>;
};
