import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Box, Tooltip, Menu, MenuItem } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';

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
          <Button
            size="small"
            disabled
            sx={{
              fontSize: furyActive.typography.body1.fontSize,
              color: '#fff',
            }}
            onClick={handleOpenLocales}
          >
            {echoActiveId === 'en' && 'English'}
            {echoActiveId === 'pt' && 'Português'}
            {echoActiveId === 'de' && 'Deutsch'}
            {echoActiveId === 'fr' && 'Français'}
          </Button>
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
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${echoActiveId}`, '/de'));
            handleCloseLocales();
          }}
        >
          Deutsch
        </MenuItem>
        <MenuItem
          onClick={() => {
            push(asPath.replace(`/${echoActiveId}`, '/fr'));
            handleCloseLocales();
          }}
        >
          Français
        </MenuItem>
      </Menu>
    </Box>
  );
};
