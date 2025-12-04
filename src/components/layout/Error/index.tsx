import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useI18n } from 'hooks';

export interface ErrorProps {
  msg?: string;
  height?: string;
}

export const Error = ({ msg, height }: ErrorProps) => {
  const { t } = useI18n();

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
              {msg || t('error')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
