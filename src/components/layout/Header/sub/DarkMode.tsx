import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useTheme } from '@mui/material/styles';
import { useDarkMode, useI18n } from 'hooks';

/**
 * DarkMode
 */
export const DarkMode = () => {
  const theme = useTheme();
  const { isDark, toggleDarkMode } = useDarkMode();
  const { t } = useI18n();

  return (
    <Box>
      <Box>
        <Tooltip title={t('tooltip-darkmode')}>
          <IconButton size="small" onClick={toggleDarkMode}>
            {isDark ? (
              <Brightness4Icon
                sx={{
                  fontSize: theme.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            ) : (
              <DarkModeIcon
                sx={{
                  fontSize: theme.typography.h5.fontSize,
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
