import React from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { useI18n } from 'hooks';

export interface LoadingProps {
  msg?: string;
  height?: string;
}

export const Loading = ({ msg, height }: LoadingProps) => {
  const { t } = useI18n();

  return (
    <Grid container sx={{ height: height || '300px' }} alignItems="center">
      <Grid item xs={12}>
        <Box textAlign="center">
          <CircularProgress size={81} color="primary" />
          <Box pt={1.5}>
            <Typography variant="h6" color="primary">
              {msg || t('loading')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
