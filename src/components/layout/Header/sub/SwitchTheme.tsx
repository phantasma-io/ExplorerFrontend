import React, { useState, useMemo, useCallback } from 'react';
import { IconButton, Box, Grid, Tooltip, Menu, MenuItem } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { Text, Image } from 'components/display';
import { useI18n, useThemeSettings } from 'hooks';

/**
 * SwitchTheme
 */
export const SwitchTheme = () => {
  const { theme, themeId, setThemeId } = useThemeSettings();
  const { t } = useI18n();

  const isDark = useMemo(
    () => themeId.includes('-dark') || theme.palette.mode === 'dark',
    [theme.palette.mode, themeId],
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

  const selectTheme = useCallback(
    (baseId: 'soul' | 'kcal' | 'gm') => {
      const nextId = isDark ? `${baseId}-dark` : baseId;
      setThemeId(nextId as typeof themeId);
      handleCloseBrands();
    },
    [handleCloseBrands, isDark, setThemeId],
  );

  return (
    <Box>
      <Box>
        <Tooltip title={t('tooltip-theme')}>
          <IconButton size="small" onClick={handleOpenBrands}>
            <PaletteIcon
              sx={{
                fontSize: theme.typography.h5.fontSize,
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
          onClick={() => selectTheme('soul')}
          sx={{
            borderLeft: `3px solid ${
              themeId.includes('soul')
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              themeId.includes('soul')
                ? theme.palette.primary.main
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
          onClick={() => selectTheme('kcal')}
          sx={{
            borderLeft: `3px solid ${
              themeId.includes('kcal')
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              themeId.includes('kcal')
                ? theme.palette.primary.main
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
          onClick={() => selectTheme('gm')}
          sx={{
            borderLeft: `3px solid ${
              themeId.includes('gm')
                ? theme.palette.primary.main
                : 'rgba(0,0,0,0)'
            }`,
            borderRight: `3px solid ${
              themeId.includes('gm')
                ? theme.palette.primary.main
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
