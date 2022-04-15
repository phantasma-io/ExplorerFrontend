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
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { routes } from 'cfg';
import { Text } from 'components/display';
import { Locales } from 'types/locales';

/**
 * Search
 */
export const Search = () => {
  const { push } = useRouter();
  const { furyActive } = useFury();
  const { echo, echoActiveId } = useEcho();

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
        return routes['/address'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'transaction':
        return routes['/transaction'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'block':
        return routes['/block'](echoActiveId as Locales, {
          id: searchValue,
        });
      case 'token':
      default:
        return routes['/token'](echoActiveId as Locales, {
          id: searchValue,
        });
    }
  }, [radioValue, searchValue, echoActiveId]);

  return (
    <Box>
      <Box>
        <Tooltip title={echo('tooltip-search')}>
          <IconButton size="small" onClick={handleSearchOpen} disabled>
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
