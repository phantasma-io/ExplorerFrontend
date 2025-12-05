import React, { useState, useMemo, useCallback } from 'react';
import { IconButton, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import PaletteIcon from '@mui/icons-material/Palette';
import { useThemeMode } from 'containers/ThemeProvider';

/**
 * SwitchTheme
 */
export const SwitchTheme = () => {
  const { themeActive, themeActiveId, themeSetById } = useThemeMode();
  const { echo } = useEcho();

  const isDark = useMemo(
    () => themeActiveId === 'soul-dark',
    [themeActiveId],
  );

  const [anchorBrands, anchorBrandsSet] = useState<null | HTMLElement>(null);
  const openBrands = Boolean(anchorBrands);
  const handleOpenBrands = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      anchorBrandsSet(e.currentTarget);
    },
    [],
  );
  const handleCloseBrands = useCallback(() => {
    anchorBrandsSet(null);
  }, []);

  return (
    <Box>
      <Box>
        <Tooltip title={echo('tooltip-theme')}>
          <IconButton size="small" onClick={handleOpenBrands}>
            <PaletteIcon
              sx={{
                fontSize: themeActive.typography.h5.fontSize,
                color: '#fff',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={openBrands}
        anchorEl={anchorBrands}
        onClose={handleCloseBrands}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={() => {
            themeSetById('soul');
            handleCloseBrands();
          }}
          sx={{
            fontWeight: !isDark ? 700 : 400,
          }}
        >
          Light
        </MenuItem>
        <MenuItem
          onClick={() => {
            themeSetById('soul-dark');
            handleCloseBrands();
          }}
          sx={{
            fontWeight: isDark ? 700 : 400,
          }}
        >
          Dark
        </MenuItem>
      </Menu>
    </Box>
  );
};
