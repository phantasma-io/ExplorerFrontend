import React, { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  Paper,
  TextField,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { useLocalState } from '@ricardo-jrm/reaper';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { routes } from 'cfg';
import { Text } from 'components/display';
import { Locales } from 'types/locales';

export type SearchOptionValues =
  | 'address'
  | 'block-hash'
  | 'nft-id'
  | 'series-id'
  | 'token-symbol'
  | 'transaction-hash';

/**
 * Search
 */
export const Search = () => {
  const { push } = useRouter();
  const { furyActive } = useFury();
  const { echo, echoActiveId } = useEcho();

  const [selectedOption, selectedOptionSet] = useLocalState<SearchOptionValues>(
    'PhantasmaExplorer-searchopt',
    'address',
  );

  const [openSearch, openSearchSet] = useState(false);
  const handleSearchOpen = useCallback(() => openSearchSet(true), []);
  const handleSearchClose = useCallback(() => openSearchSet(false), []);

  const [searchValue, searchValueSet] = useState('');
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      searchValueSet(event.target.value);
    },
    [],
  );
  const searchQuery = useMemo(() => {
    switch (selectedOption) {
      case 'address':
        return routes['/address'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'transaction-hash':
        return routes['/transaction'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'nft-id':
        return routes['/block'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'series-id':
        return routes['/block'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'block-hash':
        return routes['/block'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'token-symbol':
      default:
        return routes['/token'](echoActiveId as Locales, {
          id: searchValue,
        });
    }
  }, [selectedOption, searchValue, echoActiveId]);

  // options menu
  const [anchorOptions, anchorOptionsSet] = useState<null | HTMLElement>(null);
  const openOptions = Boolean(anchorOptions);
  const handleOptionsClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      anchorOptionsSet(event.currentTarget),
    [anchorOptionsSet],
  );
  const handleOptionsClose = useCallback(
    () => anchorOptionsSet(null),
    [anchorOptionsSet],
  );
  const setOption = useCallback(
    (opt: SearchOptionValues) => {
      selectedOptionSet(opt);
      handleOptionsClose();
    },
    [selectedOptionSet, handleOptionsClose],
  );

  return (
    <Box>
      <Box>
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
      <Dialog open={openSearch} onClose={handleSearchClose} fullWidth>
        <Paper>
          <Box pt={2} px={2}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Text variant="subtitle1" value={echo('search')} />
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
              <Grid container alignItems="center" spacing={1}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  container
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <IconButton size="small" onClick={handleOptionsClick}>
                      <ArrowDropDownIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography align="right" fontWeight={600}>
                      {`${echo(selectedOption)}:`}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    variant="outlined"
                    color="primary"
                    size="small"
                    fullWidth
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchClose();
                        push(searchQuery);
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box textAlign="right" pt={3}>
              <Box display="inline-block" mr={1.5}>
                <Button
                  color="primary"
                  variant="text"
                  onClick={() => {
                    searchValueSet('');
                  }}
                >
                  {echo('clear')}
                </Button>
              </Box>
              <Box display="inline-block">
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
          </Box>
          <Menu
            anchorEl={anchorOptions}
            open={openOptions}
            onClose={handleOptionsClose}
          >
            <MenuItem onClick={() => setOption('address')}>
              {echo('address')}
            </MenuItem>
            <MenuItem onClick={() => setOption('block-hash')}>
              {echo('block-hash')}
            </MenuItem>
            <MenuItem onClick={() => setOption('nft-id')}>
              {echo('nft-id')}
            </MenuItem>
            <MenuItem onClick={() => setOption('series-id')}>
              {echo('series-id')}
            </MenuItem>
            <MenuItem onClick={() => setOption('token-symbol')}>
              {echo('token-symbol')}
            </MenuItem>
            <MenuItem onClick={() => setOption('transaction-hash')}>
              {echo('transaction-hash')}
            </MenuItem>
          </Menu>
        </Paper>
      </Dialog>
    </Box>
  );
};
