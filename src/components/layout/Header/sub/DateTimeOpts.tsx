import React, { useState, useCallback } from 'react';
import { IconButton, Box, Grid, Tooltip, Menu, MenuItem } from '@mui/material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Text } from 'components/display';
import { useTheme } from '@mui/material/styles';
import { useI18n } from 'hooks';
import { useDatetimeOpts } from 'hooks/datetime/useDatetimeOpts';

/**
 * DateTimeOpts
 */
export const DateTimeOpts = () => {
  const { dtOpts, dtOptsSet } = useDatetimeOpts();

  const theme = useTheme();
  const { t } = useI18n();

  const [anchorOptions, anchorOptionsSet] = useState<null | HTMLElement>(null);
  const openOptions = Boolean(anchorOptions);
  const handleOpenOptions = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      anchorOptionsSet(e.currentTarget);
    },
    [],
  );
  const handleCloseOptions = useCallback(() => {
    anchorOptionsSet(null);
  }, []);

  return (
    <Box>
      <Box>
        <Tooltip title={t('tooltip-datetimeopts')}>
          <IconButton size="small" onClick={handleOpenOptions}>
            <AccessTimeFilledIcon
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: '#fff',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        open={openOptions}
        anchorEl={anchorOptions}
        onClose={handleCloseOptions}
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
            dtOptsSet('local');
            handleCloseOptions();
          }}
          sx={{
            borderLeft: `3px solid ${
              dtOpts === 'local'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'local'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={t('dt-local')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>

        <MenuItem
          onClick={() => {
            dtOptsSet('local-24');
            handleCloseOptions();
          }}
          sx={{
            borderLeft: `3px solid ${
              dtOpts === 'local-24'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'local-24'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={t('dt-local-24')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dtOptsSet('utc');
            handleCloseOptions();
          }}
          sx={{
            borderLeft: `3px solid ${
              dtOpts === 'utc'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'utc'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={t('dt-utc')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dtOptsSet('utc-24');
            handleCloseOptions();
          }}
          sx={{
            borderLeft: `3px solid ${
              dtOpts === 'utc-24'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'utc-24'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={t('dt-utc-24')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dtOptsSet('unix');
            handleCloseOptions();
          }}
          sx={{
            borderLeft: `3px solid ${
              dtOpts === 'unix'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'unix'
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={t('dt-unix')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </Box>
  );
};
