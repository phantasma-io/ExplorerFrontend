import React, { useState, useMemo, useCallback } from 'react';
import { Button, Box, Grid, Tooltip, Menu, MenuItem } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import PaletteIcon from '@mui/icons-material/Palette';
import { Text, Image } from 'components/display';

/**
 * SwitchTheme
 */
export const SwitchTheme = () => {
  const { furyActive, furyActiveId, furySetById } = useFury();
  const { echo } = useEcho();

  console.log({ furyActive });

  const isDark = useMemo(() => furyActiveId.includes('-dark'), [furyActiveId]);

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
          <Button
            size="small"
            sx={{ minWidth: '30px' }}
            onClick={handleOpenBrands}
          >
            <PaletteIcon
              sx={{
                fontSize: furyActive.typography.h5.fontSize,
                color: '#fff',
              }}
            />
          </Button>
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
            furySetById(isDark ? 'soul-dark' : 'soul');
            handleCloseBrands();
          }}
          sx={{
            borderLeft: `3px solid ${
              furyActiveId.includes('soul')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              furyActiveId.includes('soul')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0.4}>
                <Image
                  src="/static/v1/img/soul.png"
                  height="1.2rem"
                  responsive
                  title="SOUL"
                  alt="SOUL"
                />
              </Box>
            </Grid>
            <Grid item>
              <Text value="SOUL" sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            furySetById(isDark ? 'kcal-dark' : 'kcal');
            handleCloseBrands();
          }}
          sx={{
            borderLeft: `3px solid ${
              furyActiveId.includes('kcal')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              furyActiveId.includes('kcal')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0}>
                <Image
                  src="/static/v1/img/kcal.png"
                  height="1.2rem"
                  responsive
                  title="KCAL"
                  alt="KCAL"
                />
              </Box>
            </Grid>
            <Grid item>
              <Text value="KCAL" sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            furySetById(isDark ? 'gm-dark' : 'gm');
            handleCloseBrands();
          }}
          sx={{
            borderLeft: `3px solid ${
              furyActiveId.includes('gm')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              furyActiveId.includes('gm')
                ? furyActive.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0}>
                <Image
                  src="/static/v1/img/gm.png"
                  height="1.2rem"
                  responsive
                  title="KCAL"
                  alt="KCAL"
                />
              </Box>
            </Grid>
            <Grid item>
              <Text value="GM" sx={{ fontWeight: 600 }} />
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
    </Box>
  );
};
