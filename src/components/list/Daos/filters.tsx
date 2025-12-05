/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useEcho } from 'hooks/useEcho';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { DaoParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export interface DaosListFiltersProps extends DaoParams {
  organization_nameSet: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  organization_name_partialSet: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

export const DaosListFilters = ({
  organization_name,
  organization_nameSet,
  organization_name_partial,
  organization_name_partialSet,
}: DaosListFiltersProps) => {
  const { echo } = useEcho();

  const [isOpen, isOpenSet] = useState<boolean>(false);
  const handleOpen = useCallback(() => {
    isOpenSet(true);
  }, [isOpenSet]);
  const handleClose = useCallback(() => {
    isOpenSet(false);
  }, [isOpenSet]);

  // hold states
  const [hold_organization_name, hold_organization_nameSet] = useState<string>(
    organization_name || '',
  );
  const organization_nameChange = useCallback(
    (val: string) => hold_organization_nameSet(val),
    [hold_organization_nameSet],
  );
  const [hold_organization_name_partial, hold_organization_name_partialSet] =
    useState<string>(organization_name_partial || '');
  const organization_name_partialChange = useCallback(
    (val: string) => hold_organization_name_partialSet(val),
    [hold_organization_name_partialSet],
  );

  // actions
  const clearFields = useCallback(() => {
    hold_organization_nameSet('');
    hold_organization_name_partialSet('');
  }, []);
  const applyFields = useCallback(() => {
    organization_nameSet(
      hold_organization_name !== '' ? hold_organization_name : undefined,
    );
    organization_name_partialSet(
      hold_organization_name_partial !== ''
        ? hold_organization_name_partial
        : undefined,
    );

    handleClose();
  }, [
    handleClose,
    organization_nameSet,
    hold_organization_name,
    organization_name_partialSet,
    hold_organization_name_partial,
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
        title={echo('filter-daos')}
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
                  'organization_nameExact',
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
                  'organization_name_partial',
                )}:`}</Typography>
              </Grid>
              <Grid item xs={12} lg={10}>
                <TextField
                  fullWidth
                  size="small"
                  value={hold_organization_name_partial}
                  onChange={(e) =>
                    organization_name_partialChange(e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
