import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import ErrorIcon from '@mui/icons-material/Error';

export interface ErrorProps {
  msg?: string;
  height?: string;
}

export const Error = ({ msg, height }: ErrorProps) => {
  const { echo } = useEcho();

  return (
    <Grid container sx={{ height: height || '300px' }} alignItems="center">
      <Grid item xs={12}>
        <Box textAlign="center">
          <Box>
            <Typography color="error">
              <ErrorIcon sx={{ fontSize: '81px' }} />
            </Typography>
          </Box>
          <Box pt={1.5}>
            <Typography variant="h6" color="error">
              {msg || echo('error')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
