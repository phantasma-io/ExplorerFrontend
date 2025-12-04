/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from 'react';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import { Dialog } from 'components/layout';
import { PlatformParams } from 'types/api';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useI18n } from 'hooks';

export interface PlatformsListFiltersProps extends PlatformParams {
  nameSet: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const PlatformsListFilters = ({
  name,
  nameSet,
}: PlatformsListFiltersProps) => {
  const { t } = useI18n();

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

  // actions
  const clearFields = useCallback(() => {
    hold_nameSet('');
  }, []);
  const applyFields = useCallback(() => {
    nameSet(hold_name !== '' ? hold_name : undefined);

    handleClose();
  }, [handleClose, nameSet, hold_name]);

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
        title={t('filter-platforms')}
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
                <Typography fontWeight={600}>{`${t('name')}:`}</Typography>
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
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
};
