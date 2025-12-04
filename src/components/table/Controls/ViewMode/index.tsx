import React from 'react';
import { Box, Button } from '@mui/material';
import { TableViewModes } from 'types/table';
import ViewListIcon from '@mui/icons-material/ViewList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useI18n } from 'hooks';

export interface TableViewModeProps {
  viewMode: TableViewModes;
  viewModeSet: React.Dispatch<React.SetStateAction<TableViewModes>>;
}

export const TableViewMode = ({
  viewMode,
  viewModeSet,
}: TableViewModeProps) => {
  const { t } = useI18n();
  return (
    <Box>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Button
          size="small"
          onClick={() => {
            if (viewMode === 'desktop') {
              viewModeSet('mobile');
            } else {
              viewModeSet('desktop');
            }
          }}
          endIcon={
            viewMode === 'desktop' ? (
              <FormatListBulletedIcon />
            ) : (
              <ViewListIcon />
            )
          }
          color="inherit"
        >
          {t('table-toggleViewMode')}
        </Button>
      </Box>
    </Box>
  );
};
