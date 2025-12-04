import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useI18n } from 'hooks';

export interface EmptyProps {
  msg?: string;
  height?: string;
}

export const Empty = ({ msg, height }: EmptyProps) => {
  const { t } = useI18n();

  return (
    <Grid container sx={{ height: height || '300px' }} alignItems="center">
      <Grid item xs={12}>
        <Box textAlign="center">
          <Box>
            <Typography color="textSecondary">
              <InboxIcon sx={{ fontSize: '81px' }} />
            </Typography>
          </Box>
          <Box pt={1.5}>
            <Typography variant="h6" color="textSecondary">
              {msg || t('no-results')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
