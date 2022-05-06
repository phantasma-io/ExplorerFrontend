/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { AddressParams, WithOption } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export interface AddressesListFiltersProps extends AddressParams {
  addressSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  address_partialSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  address_nameSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  organization_nameSet: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  validator_kindSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  with_storageSet: React.Dispatch<React.SetStateAction<WithOption>>;
  with_stakesSet: React.Dispatch<React.SetStateAction<WithOption>>;
  with_balanceSet: React.Dispatch<React.SetStateAction<WithOption>>;
}

export const AddressesListFilters = ({
  address,
  addressSet,
  address_partial,
  address_partialSet,
  address_name,
  address_nameSet,
  organization_name,
  organization_nameSet,
  validator_kind,
  validator_kindSet,
  with_balance,
  with_balanceSet,
  with_stakes,
  with_stakesSet,
  with_storage,
  with_storageSet,
}: AddressesListFiltersProps) => {
  const { echo } = useEcho();

  const [isOpen, isOpenSet] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    isOpenSet(true);
  }, [isOpenSet]);
  const handleClose = useCallback(() => {
    isOpenSet(false);
  }, [isOpenSet]);

  // hold states
  const [hold_address, hold_addressSet] = useState<string>(address || '');
  const addressChange = useCallback(
    (val: string) => hold_addressSet(val),
    [hold_addressSet],
  );
  const [hold_address_name, hold_address_nameSet] = useState<string>(
    address_name || '',
  );
  const address_nameChange = useCallback(
    (val: string) => hold_address_nameSet(val),
    [hold_address_nameSet],
  );
  const [hold_address_partial, hold_address_partialSet] = useState<string>(
    address_partial || '',
  );
  const address_partialChange = useCallback(
    (val: string) => hold_address_partialSet(val),
    [hold_address_partialSet],
  );
  const [hold_organization_name, hold_organization_nameSet] = useState<string>(
    organization_name || '',
  );
  const organization_nameChange = useCallback(
    (val: string) => hold_organization_nameSet(val),
    [hold_organization_nameSet],
  );
  const [hold_validator_kind, hold_validator_kindSet] = useState<string>(
    validator_kind || '',
  );
  const validator_kindChange = useCallback(
    (val: string) => hold_validator_kindSet(val),
    [hold_validator_kindSet],
  );

  // actions
  const clearFields = useCallback(() => {
    hold_addressSet('');
    hold_address_nameSet('');
    hold_address_partialSet('');
    hold_organization_nameSet('');
    hold_validator_kindSet('');
  }, []);
  const applyFields = useCallback(() => {
    addressSet(hold_address !== '' ? hold_address : undefined);
    address_nameSet(hold_address_name !== '' ? hold_address_name : undefined);
    address_partialSet(
      hold_address_partial !== '' ? hold_address_partial : undefined,
    );
    organization_nameSet(
      hold_organization_name !== '' ? hold_organization_name : undefined,
    );
    validator_kindSet(
      hold_validator_kind !== '' ? hold_validator_kind : undefined,
    );
    handleClose();
  }, [
    addressSet,
    hold_address,
    handleClose,
    hold_address_name,
    address_nameSet,
    hold_address_partial,
    address_partialSet,
    hold_organization_name,
    organization_nameSet,
    hold_validator_kind,
    validator_kindSet,
  ]);

  return (
    <Box>
      <Button
        endIcon={<FilterAltIcon color="inherit" />}
        color="inherit"
        size="small"
        onClick={handleOpen}
      >
        {echo('filterData')}
      </Button>
      <Dialog
        handleClose={handleClose}
        isOpen={isOpen}
        title={echo('filter-addresses')}
        actions={
          <Box textAlign="right">
            <Box display="inline-block" mr={1.5}>
              <Button
                color="primary"
                variant="text"
                onClick={clearFields}
                endIcon={<ClearAllIcon />}
              >
                {echo('clear')}
              </Button>
            </Box>
            <Box display="inline-block">
              <Button
                color="primary"
                variant="contained"
                onClick={applyFields}
                endIcon={<CheckIcon />}
              >
                {echo('apply')}
              </Button>
            </Box>
          </Box>
        }
      >
        <Box
          p={1}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              applyFields();
            }
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'addressExact',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_address}
                  onChange={(e) => addressChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'address_partial',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_address_partial}
                  onChange={(e) => address_partialChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'address_name',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_address_name}
                  onChange={(e) => address_nameChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'organization_name',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_organization_name}
                  onChange={(e) => organization_nameChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'validator_kind',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_validator_kind}
                  onChange={(e) => validator_kindChange(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
