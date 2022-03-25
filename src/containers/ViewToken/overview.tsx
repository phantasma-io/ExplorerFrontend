import React from 'react';
import { Box, Grid } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useTokenData } from 'hooks/api';
import { TokenResults } from 'types/api';
import { TokenPriceChart } from './PriceChart';

export interface TokenOverviewProps {
  data?: TokenResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TokenOverview = ({ data }: TokenOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows } = useTokenData(data);

  return (
    <Box p={1}>
      <Grid container>
        <Grid item xs={12} pb={1}>
          {data && renderOverview(cols, rows)}
        </Grid>
        <Grid item xs={12} pb={1}>
          <Box>{/* <TokenPriceChart /> */}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};
