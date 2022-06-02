import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  HomeNav,
  Localization,
  Search,
  DarkMode,
  SwitchTheme,
  GetWallet,
} from './sub';

/**
 * Header props
 */
export interface HeaderProps {
  /**
   * Element height
   */
  height: number;
}

/**
 * Header
 */
export const Header = ({ height }: HeaderProps) => {
  return (
    <Box
      px={{
        xs: 2,
        sm: 3,
        md: 4,
        lg: 5,
        xl: 6,
      }}
      sx={{ background: 'transparent' }}
    >
      <Grid container sx={{ height: `${height}px` }} alignItems="center">
        <Grid item xs={3} md>
          <HomeNav />
        </Grid>
        <Grid item xs>
          <Box textAlign="right">
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <Search />
            </Box>
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <GetWallet />
            </Box>
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <DarkMode />
            </Box>
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <SwitchTheme />
            </Box>
            <Box display="inline-block">
              <Localization />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
