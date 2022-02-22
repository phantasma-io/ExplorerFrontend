import React from 'react';
import { Box } from '@mui/material';
import { TableController } from '../Controller';
import { TableDisplayDesktop } from './desktop';
import { TableDisplayMobile } from './mobile';
import { TableDisplayData, DetailSchema } from './types';

export interface TableDisplayProps extends TableDisplayData {
  total: number;
  withDetails?: DetailSchema;
}

export const TableDisplay = ({
  rows,
  cols,
  total,
  withDetails,
}: TableDisplayProps) => {
  return (
    <Box p={1}>
      <Box mb={1}>
        <TableController total={total} />
      </Box>
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
