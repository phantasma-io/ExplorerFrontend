import React, { useState, useMemo, useCallback } from 'react';
import { Button, Box, Grid, Tooltip, Menu, MenuItem } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { routes } from 'cfg';
import { Text, Image, Link } from 'components/display';
import { Locales } from 'types/locales';

/**
 * HomeNav
 */
export const HomeNav = () => {
  const { furyActive, furyActiveId, furySetById } = useFury();
  const { echo, echoActiveId } = useEcho();

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
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Box pt={0.5}>
            <Tooltip title={echo('tooltip-nav-homepage')}>
              <Link
                href={routes['/'](echoActiveId as Locales)}
                title={echo('tooltip-nav-homepage')}
              >
                <Box
                  display={{ xs: 'none', md: 'block' }}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={'/static/v1/img/phantasma-logo-white.png'}
                    height={'24px'}
                    title="Phantasma"
                    alt="Phantasma Team"
                  />
                </Box>
                <Box
                  display={{ xs: 'block', md: 'none' }}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={'/static/v1/img/phantasma-logo-icon-white.png'}
                    height={'24px'}
                    title="Phantasma"
                    alt="Phantasma Team"
                  />
                </Box>
              </Link>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item>
          <Tooltip title={echo('tooltip-theme')}>
            <Button
              size="small"
              sx={{ minWidth: '30px' }}
              onClick={handleOpenBrands}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: furyActive.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
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
      </Menu>
    </Box>
  );
};
