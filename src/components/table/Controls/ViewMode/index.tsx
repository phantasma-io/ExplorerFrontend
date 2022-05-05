import React from 'react';
import { Box, Button } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { TableViewModes } from 'types/table';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';

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
          endIcon={<ViewAgendaIcon color="inherit" />}
          color="inherit"
        >
          {echo('table-toggleViewMode')}
        </Button>
      </Box>
    </Box>
  );
};
