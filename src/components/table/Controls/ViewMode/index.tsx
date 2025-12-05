import React from 'react';
import { Box, Button } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { TableViewModes } from 'types/table';
import ViewListIcon from '@mui/icons-material/ViewList';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export interface TableViewModeProps {
  viewMode: TableViewModes;
  viewModeSet: React.Dispatch<React.SetStateAction<TableViewModes>>;
}

export const TableViewMode = ({
  viewMode,
  viewModeSet,
}: TableViewModeProps) => {
  const { echo } = useEcho();
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
          {echo('table-toggleViewMode')}
        </Button>
      </Box>
    </Box>
  );
};
