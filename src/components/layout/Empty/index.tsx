import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import InboxIcon from '@mui/icons-material/Inbox';

export interface EmptyProps {
  msg?: string;
  height?: string;
}

export const Empty = ({ msg, height }: EmptyProps) => {
  const { echo } = useEcho();

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
              {msg || echo('no-results')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
