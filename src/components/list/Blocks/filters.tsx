/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useEcho } from '@ricardojrmcom/echo';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { BlockParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export interface BlocksListFiltersProps extends BlockParams {
  hashSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  hash_partialSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  heightSet: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const BlocksListFilters = ({
  hash,
  hashSet,
  hash_partial,
  hash_partialSet,
  height,
  heightSet,
}: BlocksListFiltersProps) => {
  const { echo } = useEcho();

  const [isOpen, isOpenSet] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    isOpenSet(true);
  }, [isOpenSet]);
  const handleClose = useCallback(() => {
    isOpenSet(false);
  }, [isOpenSet]);

  // hold states
  const [hold_hash, hold_hashSet] = useState<string>(hash || '');
  const hashChange = useCallback(
    (val: string) => hold_hashSet(val),
    [hold_hashSet],
  );
  const [hold_hash_partial, hold_hash_partialSet] = useState<string>(
    hash_partial || '',
  );
  const hash_partialChange = useCallback(
    (val: string) => hold_hash_partialSet(val),
    [hold_hash_partialSet],
  );
  const [hold_height, hold_heightSet] = useState<string>(height || '');
  const heightChange = useCallback(
    (val: string) => hold_heightSet(val),
    [hold_heightSet],
  );

  // actions
  const clearFields = useCallback(() => {
    hold_hashSet('');
    hold_hash_partialSet('');
    hold_heightSet('');
  }, []);
  const applyFields = useCallback(() => {
    hashSet(hold_hash !== '' ? hold_hash : undefined);
    hash_partialSet(hold_hash_partial !== '' ? hold_hash_partial : undefined);
    heightSet(hold_height !== '' ? hold_height : undefined);

    handleClose();
  }, [
    handleClose,
    hashSet,
    hold_hash,
    hash_partialSet,
    hold_hash_partial,
    heightSet,
    hold_height,
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
        title={echo('filter-blocks')}
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
                  'hashExact',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_hash}
                  onChange={(e) => hashChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo(
                  'hash_partial',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_hash_partial}
                  onChange={(e) => hash_partialChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo('height')}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_height}
                  onChange={(e) => heightChange(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
