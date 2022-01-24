import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { usePain } from '@ricardo-jrm/pain';
import { useEcho } from '@ricardo-jrm/echo';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { routes } from '../../cfg';
import { Text } from '../Text';
import { Image } from '../Image';

/**
 * Header props
 */
export interface HeaderProps {
  /**
   * Element height
   */
  height: number;
}

/**
 * Header
 */
export const Header = ({ height }: HeaderProps) => {
  const { push } = useRouter();
  const { furyActive, furyActiveId, furySetById } = useFury();
  const { echo, echoActiveId, echoSetById } = useEcho();
  const { painActive, painActiveId, painSetById } = usePain();

  const isDark = useMemo(() => furyActiveId.includes('-dark'), [furyActiveId]);

  const toggleDarkMode = useCallback(() => {
    if (isDark) {
      furySetById(furyActiveId.split('-')[0]);
    } else {
      furySetById(`${furyActiveId}-dark`);
    }
  }, [isDark, furyActiveId, furySetById]);

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

  const [openSearch, openSearchSet] = useState(false);
  const handleSearchOpen = useCallback(() => openSearchSet(true), []);
  const handleSearchClose = useCallback(() => openSearchSet(false), []);

  const [radioValue, radioValueSet] = useState('address');
  const handleRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      radioValueSet((e.target as HTMLInputElement).value),
    [],
  );

  const [searchValue, searchValueSet] = useState('');
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      searchValueSet(event.target.value);
    },
    [],
  );
  const searchQuery = useMemo(() => {
    switch (radioValue) {
      case 'address':
        return routes['/address']({
          id: searchValue,
        });
      case 'contract':
        return routes['/contract']({
          id: searchValue,
        });
      case 'transaction':
        return routes['/transaction']({
          id: searchValue,
        });
      case 'block':
        return routes['/block']({
          id: searchValue,
        });
      case 'dao':
        return routes['/dao']({
          id: searchValue,
        });
      case 'token':
      default:
        return routes['/token']({
          id: searchValue,
        });
    }
  }, [radioValue, searchValue]);

  return (
    <Box
      px={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}
      sx={{ background: 'transparent' }}
    >
      <Grid container sx={{ height: `${height}px` }} alignItems="center">
        <Grid item xs>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0.5}>
                <Tooltip title={echo('tooltip-nav-homepage')}>
                  <Box
                    onClick={() => push('/')}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={painActive.logo as string}
                      height={painActiveId === 'soul' ? '24px' : '27px'}
                    />
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item>
              <Tooltip title={echo('tooltip-nav-homepage')}>
                <Box>
                  <Text
                    variant="h5"
                    onClick={() => push('/')}
                    sx={{
                      color: '#fff',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                    value={painActive.name}
                  />
                </Box>
              </Tooltip>
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
        </Grid>
        <Grid item xs>
          <Box textAlign="right">
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <Tooltip title={echo('tooltip-search')}>
                <IconButton size="small" onClick={handleSearchOpen}>
                  <SearchIcon
                    sx={{
                      fontSize: furyActive.typography.h5.fontSize,
                      color: '#fff',
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="inline-block" pr={{ xs: 0.5, md: 1.5 }}>
              <Tooltip title={echo('tooltip-darkmode')}>
                <IconButton size="small" onClick={toggleDarkMode}>
                  {isDark ? (
                    <Brightness4Icon
                      sx={{
                        fontSize: furyActive.typography.h5.fontSize,
                        color: '#fff',
                      }}
                    />
                  ) : (
                    <DarkModeIcon
                      sx={{
                        fontSize: furyActive.typography.h5.fontSize,
                        color: '#fff',
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <Box display="inline-block">
              <Tooltip title={echo('tooltip-locale')}>
                <Button
                  size="small"
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
          </Box>
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
            painSetById('soul');
            furySetById(isDark ? 'soul-dark' : 'soul');
            handleCloseBrands();
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={1}>
                <Image
                  src="/static/v1/img/SOUL.png"
                  height="1.2rem"
                  responsive
                />
              </Box>
            </Grid>
            <Grid item>
              <Text value="SOUL" />
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={() => {
            painSetById('kcal');
            furySetById(isDark ? 'kcal-dark' : 'kcal');
            handleCloseBrands();
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={1}>
                <Image
                  src="/static/v1/img/KCAL.png"
                  height="1.2rem"
                  responsive
                />
              </Box>
            </Grid>
            <Grid item>
              <Text value="KCAL" />
            </Grid>
          </Grid>
        </MenuItem>
      </Menu>
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
            echoSetById('en');
            handleCloseLocales();
          }}
        >
          English
        </MenuItem>
        <MenuItem
          onClick={() => {
            echoSetById('pt');
            handleCloseLocales();
          }}
        >
          Português
        </MenuItem>
        <MenuItem
          onClick={() => {
            echoSetById('de');
            handleCloseLocales();
          }}
        >
          Deutsch
        </MenuItem>
        <MenuItem
          onClick={() => {
            echoSetById('fr');
            handleCloseLocales();
          }}
        >
          Français
        </MenuItem>
      </Menu>
      <Dialog open={openSearch} onClose={handleSearchClose} fullWidth>
        <Paper>
          <Box pt={2} px={2}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Text variant="h6" value={echo('search')} />
              </Grid>
              <Grid item>
                <Tooltip title={echo('close')}>
                  <IconButton size="small" onClick={handleSearchClose}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Box>
          <Box px={2} pb={2} pt={1}>
            <Box>
              <TextField
                variant="outlined"
                color="primary"
                fullWidth
                value={searchValue}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchClose();
                    push(searchQuery);
                  }
                }}
                // label={echo('search')}
              />
            </Box>
            <Box pt={2}>
              <FormControl component="fieldset">
                <RadioGroup value={radioValue} onChange={handleRadioChange} row>
                  <FormControlLabel
                    value="address"
                    control={<Radio color="primary" />}
                    label={echo('address')}
                  />
                  {/* <FormControlLabel
                    value="block"
                    control={<Radio color="primary" />}
                    label={echo('block')}
                  /> */}
                  <FormControlLabel
                    value="contract"
                    control={<Radio color="primary" />}
                    label={echo('contract')}
                  />
                  <FormControlLabel
                    value="token"
                    control={<Radio color="primary" />}
                    label={echo('token')}
                  />
                  <FormControlLabel
                    value="transaction"
                    control={<Radio color="primary" />}
                    label={echo('transaction')}
                  />
                  {/* <FormControlLabel
                    value="dao"
                    control={<Radio color="primary" />}
                    label={echo('dao')}
                  /> */}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box textAlign="right" pt={1}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  handleSearchClose();
                  push(searchQuery);
                }}
              >
                {echo('apply')}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Dialog>
    </Box>
  );
};
