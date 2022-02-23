import React from 'react';
import { Box } from '@mui/material';
import { TableDisplayDesktop } from './desktop';
import { TableDisplayMobile } from './mobile';
import { TableDisplayData } from '../../../types/table';

export interface TableDisplayProps extends TableDisplayData {
  withDetails?: boolean;
}

export const TableDisplay = ({
  rows,
  cols,
  withDetails = true,
}: TableDisplayProps) => {
  return (
    <Box>
      {/* desktop */}
      <Box mb={1} display={{ xs: 'none', md: 'block' }}>
        <TableDisplayDesktop
          rows={rows}
          cols={cols}
          withDetails={withDetails}
        />
      </Box>
      {/* mobile */}
      <Box mb={1} display={{ xs: 'block', md: 'none' }}>
        <TableDisplayMobile />
      </Box>
    </Box>
  );
};
