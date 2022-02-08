import React from 'react';
import { Box } from '@mui/material';
import { TableController } from '../Controller';
import { TableDisplayDesktop } from './desktop';
import { TableDisplayMobile } from './mobile';
import { TableDisplayData } from './types';

export interface TableDisplayProps extends TableDisplayData {
  total: number;
}

export const TableDisplay = ({ rows, cols, total }: TableDisplayProps) => {
  return (
    <Box p={1}>
      <Box mb={1}>
        <TableController total={total} />
      </Box>
      {/* desktop */}
      <Box mb={1} display={{ xs: 'none', md: 'block' }}>
        <TableDisplayDesktop rows={rows} cols={cols} />
      </Box>
      {/* mobile */}
      <Box mb={1} display={{ xs: 'block', md: 'none' }}>
        <TableDisplayMobile />
      </Box>
    </Box>
  );
};
