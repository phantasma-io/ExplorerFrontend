/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { TransactionParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { boolean } from 'yup';

export interface TransactionsListFiltersProps extends TransactionParams {
  addressSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  address_disable?: boolean;
}

export const TransactionsListFilters = ({
  address,
  addressSet,
  address_disable,
}: TransactionsListFiltersProps) => {
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

  // actions
  const clearFields = useCallback(() => {
    hold_addressSet('');
  }, []);
  const applyFields = useCallback(() => {
    addressSet(hold_address !== '' ? hold_address : undefined);

    handleClose();
  }, [handleClose, addressSet, hold_address]);

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
        title={echo('filter-transactions')}
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
