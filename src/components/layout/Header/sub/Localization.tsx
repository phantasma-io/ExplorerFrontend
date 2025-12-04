import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import { useTheme } from '@mui/material/styles';
import { useI18n } from 'hooks';

/**
 * Localization
 */
export const Localization = () => {
  const { push, asPath } = useRouter();
  const theme = useTheme();
  const { t, locale } = useI18n();

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
        <Tooltip title={t('tooltip-locale')}>
          <IconButton size="small" onClick={handleOpenLocales}>
            <PublicIcon
              sx={{
                fontSize: theme.typography.h5.fontSize,
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
            push(asPath.replace(`/${locale}`, '/en'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              locale === 'en'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              locale === 'en'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${locale}`, '/pt'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              locale === 'pt'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              locale === 'pt'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          Português
        </MenuItem>
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${locale}`, '/de'));
            handleCloseLocales();
          }}
          sx={{
            borderLeft: `3px solid ${
              locale === 'de'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              locale === 'de'
                ? theme.palette.primary.main
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
