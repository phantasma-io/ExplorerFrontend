/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { SeriesParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export interface SeriesListFiltersProps extends SeriesParams {
  nameSet: React.Dispatch<React.SetStateAction<string | undefined>>;
  symbolSet: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SeriesListFilters = ({
  name,
  nameSet,
  symbol,
  symbolSet,
}: SeriesListFiltersProps) => {
  const { echo } = useEcho();

  const [isOpen, isOpenSet] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    isOpenSet(true);
  }, [isOpenSet]);
  const handleClose = useCallback(() => {
    isOpenSet(false);
  }, [isOpenSet]);

  // hold states
  const [hold_name, hold_nameSet] = useState<string>(name || '');
  const nameChange = useCallback(
    (val: string) => hold_nameSet(val),
    [hold_nameSet],
  );
  const [hold_symbol, hold_symbolSet] = useState<string>(symbol || '');
  const symbolChange = useCallback(
    (val: string) => hold_symbolSet(val.toUpperCase()),
    [hold_symbolSet],
  );

  // actions
  const clearFields = useCallback(() => {
    hold_nameSet('');
    hold_symbolSet('');
  }, []);
  const applyFields = useCallback(() => {
    nameSet(hold_name !== '' ? hold_name : undefined);
    symbolSet(hold_symbol !== '' ? hold_symbol : undefined);

    handleClose();
  }, [handleClose, nameSet, hold_name, symbolSet, hold_symbol]);

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
        title={echo('filter-series')}
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
                <Typography fontWeight={600}>{`${echo('name')}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_name}
                  onChange={(e) => nameChange(e.target.value)}
                />
              </Grid>
            </Grid>
            {/* field */}
            <Grid item xs={12} container alignItems="center" spacing={1}>
              <Grid item xs={12} lg={2}>
                <Typography fontWeight={600}>{`${echo('symbol')}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_symbol}
                  onChange={(e) => symbolChange(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
