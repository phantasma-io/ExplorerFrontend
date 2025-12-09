import React, { useMemo, useCallback } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { useThemeMode } from 'containers/ThemeProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';

/**
 * DarkMode
 */
export const DarkMode = () => {
  const { themeActive, themeActiveId, themeSetById } = useThemeMode();
  const { echo } = useEcho();

  const isDark = useMemo(
    () => themeActiveId === 'soul-dark',
    [themeActiveId],
  );

  const toggleDarkMode = useCallback(() => {
    if (isDark) {
      themeSetById('soul');
    } else {
      themeSetById('soul-dark');
    }
  }, [isDark, themeSetById]);

  return (
    <Box>
      <Box>
        <Tooltip title={echo('tooltip-darkmode')}>
          <IconButton size="small" onClick={toggleDarkMode}>
            {isDark ? (
              <Brightness4Icon
                sx={{
                  fontSize: themeActive.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            ) : (
              <DarkModeIcon
                sx={{
                  fontSize: themeActive.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
