import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import PublicIcon from '@mui/icons-material/Public';
import { useThemeMode } from 'containers/ThemeProvider';

/**
 * Localization
 */
export const Localization = () => {
  const { push, asPath } = useRouter();
  const { themeActive } = useThemeMode();
  const { echo, echoActiveId } = useEcho();

  const [anchorLocales, anchorLocalesSet] = useState<null | HTMLElement>(null);
  const openLocales = Boolean(anchorLocales);
  const handleOpenLocales = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      anchorLocalesSet(e.currentTarget);
    },
    [],
  );
  const handleCloseLocales = useCallback(() => {
    anchorLocalesSet(null);
  }, []);

  return (
    <Box>
      <Box>
        <Tooltip title={echo('tooltip-locale')}>
          <IconButton size="small" onClick={handleOpenLocales}>
            <PublicIcon
              sx={{
                fontSize: themeActive.typography.h5.fontSize,
                color: '#fff',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={openLocales}
        anchorEl={anchorLocales}
        onClose={handleCloseLocales}
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
            push(asPath.replace(`/${echoActiveId}`, '/en'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              echoActiveId === 'en'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              echoActiveId === 'en'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${echoActiveId}`, '/pt'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              echoActiveId === 'pt'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              echoActiveId === 'pt'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          Português
        </MenuItem>
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${echoActiveId}`, '/de'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              echoActiveId === 'de'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              echoActiveId === 'de'
                ? themeActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          Deutsch
        </MenuItem>
      </Menu>
    </Box>
  );
};
