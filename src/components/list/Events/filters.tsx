/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { EventParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useI18n } from 'hooks';

export interface EventsListFiltersProps extends EventParams {
  addressSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  address_partialSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  address_disable?: boolean;
}

export const EventsListFilters = ({
  address,
  addressSet,
  address_partial,
  address_partialSet,
  address_disable,
}: EventsListFiltersProps) => {
  const { t } = useI18n();

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
  const [hold_address_partial, hold_address_partialSet] = useState<string>(
    address_partial || '',
  );
  const address_partialChange = useCallback(
    (val: string) => hold_address_partialSet(val),
    [hold_address_partialSet],
  );

  // actions
  const clearFields = useCallback(() => {
    hold_addressSet('');
    hold_address_partialSet('');
  }, []);
  const applyFields = useCallback(() => {
    addressSet(hold_address !== '' ? hold_address : undefined);
    address_partialSet(
      hold_address_partial !== '' ? hold_address_partial : undefined,
    );

    handleClose();
  }, [
    handleClose,
    addressSet,
    hold_address,
    address_partialSet,
    hold_address_partial,
  ]);

  return (
    <Box>
      <Button
        endIcon={<FilterAltIcon color="inherit" />}
        color="inherit"
        size="small"
        onClick={handleOpen}
      >
        {t('filterData')}
      </Button>
      <Dialog
        handleClose={handleClose}
        isOpen={isOpen}
        title={t('filter-events')}
        actions={
          <Box textAlign="right">
            <Box display="inline-block" mr={1.5}>
              <Button
                color="primary"
                variant="text"
                onClick={clearFields}
                endIcon={<ClearAllIcon />}
              >
                {t('clear')}
              </Button>
            </Box>
            <Box display="inline-block">
              <Button
                color="primary"
                variant="contained"
                onClick={applyFields}
                endIcon={<CheckIcon />}
              >
                {t('apply')}
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
                <Typography fontWeight={600}>{`${t(
                  'addressExact',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_address}
                  onChange={(e) => addressChange(e.target.value)}
                  disabled={address_disable}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${t(
                  'address_partial',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_address_partial}
                  onChange={(e) => address_partialChange(e.target.value)}
                  disabled={address_disable}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
