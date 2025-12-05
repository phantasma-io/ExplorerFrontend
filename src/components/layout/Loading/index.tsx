import React from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';

export interface LoadingProps {
  msg?: string;
  height?: string;
}

export const Loading = ({ msg, height }: LoadingProps) => {
  const { echo } = useEcho();

  return (
    <Grid container sx={{ height: height || '300px' }} alignItems="center">
      <Grid item xs={12}>
        <Box textAlign="center">
          <CircularProgress size={81} color="primary" />
          <Box pt={1.5}>
            <Typography variant="h6" color="primary">
              {msg || echo('loading')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
