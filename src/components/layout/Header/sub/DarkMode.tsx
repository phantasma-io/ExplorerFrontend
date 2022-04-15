import React, { useMemo, useCallback } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';

/**
 * DarkMode
 */
export const DarkMode = () => {
  const { furyActive, furyActiveId, furySetById } = useFury();
  const { echo } = useEcho();

  const isDark = useMemo(() => furyActiveId.includes('-dark'), [furyActiveId]);

  const toggleDarkMode = useCallback(() => {
    if (isDark) {
      furySetById(furyActiveId.split('-')[0]);
    } else {
      furySetById(`${furyActiveId}-dark`);
    }
  }, [isDark, furyActiveId, furySetById]);

  return (
    <Box>
      <Box>
        <Tooltip title={echo('tooltip-darkmode')}>
          <IconButton size="small" onClick={toggleDarkMode}>
            {isDark ? (
              <Brightness4Icon
                sx={{
                  fontSize: furyActive.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            ) : (
              <DarkModeIcon
                sx={{
                  fontSize: furyActive.typography.h5.fontSize,
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
