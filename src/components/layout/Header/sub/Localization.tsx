import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { IconButton, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import PublicIcon from '@mui/icons-material/Public';

/**
 * Localization
 */
export const Localization = () => {
  const { push, asPath } = useRouter();
  const { furyActive } = useFury();
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
                fontSize: furyActive.typography.h5.fontSize,
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              echoActiveId === 'en'
                ? furyActive.palette.primary.main
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
        >
          Português
        </MenuItem>
        {/* 
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${echoActiveId}`, '/de'));
            handleCloseLocales();
          }}
        >
          Deutsch
        </MenuItem>
         */}
      </Menu>
    </Box>
  );
};
