import React, { useState, useCallback } from 'react';
import { IconButton, Box, Grid, Tooltip, Menu, MenuItem } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Text } from 'components/display';
import { useDatetimeOpts } from 'hooks/datetime/useDatetimeOpts';

/**
 * DateTimeOpts
 */
export const DateTimeOpts = () => {
  const { dtOpts, dtOptsSet } = useDatetimeOpts();

  const { furyActive } = useFury();
  const { echo } = useEcho();

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
        <Tooltip title={echo('tooltip-datetimeopts')}>
          <IconButton size="small" onClick={handleOpenOptions}>
            <AccessTimeFilledIcon
              sx={{
                fontSize: furyActive.typography.h5.fontSize,
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'local'
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={echo('dt-local')} sx={{ fontWeight: 600 }} />
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'local-24'
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={echo('dt-local-24')} sx={{ fontWeight: 600 }} />
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'utc'
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={echo('dt-utc')} sx={{ fontWeight: 600 }} />
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'utc-24'
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={echo('dt-utc-24')} sx={{ fontWeight: 600 }} />
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
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              dtOpts === 'unix'
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Text value={echo('dt-unix')} sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </Box>
  );
};
