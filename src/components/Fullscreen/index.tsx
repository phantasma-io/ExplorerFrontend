import React, { ReactNode } from 'react';
import { Box, Grid } from '@mui/material';

/**
 * Fullscreen props
 */
export interface FullscreenProps {
  children?: ReactNode;
  subtract?: number;
}

/**
 * Fullscreen
 */
export const Fullscreen = ({ children, subtract = 0 }: FullscreenProps) => (
  <Grid
    container
    sx={{
      minHeight: `calc(100vh - ${subtract}px)`,
    }}
    alignItems={'center'}
    alignContent="center"
    justifyContent={'center'}
    justifyItems={'center'}
  >
    <Grid
      item
      xs={12}
      container
      sx={{
        minHeight: `calc(100vh - ${subtract}px)`,
      }}
      alignItems={'center'}
      alignContent="center"
      justifyContent={'center'}
      justifyItems={'center'}
    >
      <Grid
        item
        xs={12}
        container
        alignItems={'center'}
        alignContent="center"
        justifyContent={'center'}
        justifyItems={'center'}
      >
        <Box>{children}</Box>
      </Grid>
    </Grid>
  </Grid>
);
