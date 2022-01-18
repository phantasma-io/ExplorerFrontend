import React, { ReactNode } from 'react';
import { Box, Grid, GridSpacing } from '@mui/material';

/**
 * Fullscreen props
 */
export interface FullscreenProps {
  children?: ReactNode;
  spacing?: GridSpacing;
  subtract?: number;
}

/**
 * Fullscreen
 */
export const Fullscreen = ({
  children,
  spacing = 2,
  subtract = 0,
}: FullscreenProps) => (
  <Grid
    container
    sx={{
      minHeight: `calc(100vh - ${subtract}px)`,
    }}
    alignContent="center"
  >
    <Grid
      item
      xs={12}
      container
      sx={{
        minHeight: `calc(100vh - ${subtract}px)`,
      }}
      alignContent="center"
      spacing={spacing}
    >
      <Grid
        item
        xs={12}
        container
        alignItems={'center'}
        alignContent="center"
        justifyContent={'center'}
        spacing={spacing}
      >
        <Box>{children}</Box>
      </Grid>
    </Grid>
  </Grid>
);
