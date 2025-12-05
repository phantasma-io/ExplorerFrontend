import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { Link } from 'components/display';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useThemeMode } from 'containers/ThemeProvider';

/**
 * GotoDex
 */
export const GotoDex = () => {
  const { themeActive } = useThemeMode();
  const { echo } = useEcho();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.info/soul-swap" external>
          <Tooltip title={echo('tooltip-gotodex')}>
            <IconButton size="small">
              <SwapHorizIcon
              sx={{
                fontSize: themeActive.typography.h5.fontSize,
                color: '#fff',
              }}
              />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </Box>
  );
};
