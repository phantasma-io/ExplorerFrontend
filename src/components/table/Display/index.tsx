import React from 'react';
import { Box } from '@mui/material';
import { TableControls } from '../Controller';
import { TableDisplayDesktop } from './desktop';
import { TableDisplayMobile } from './mobile';
import { TableDisplayData, DetailSchema } from './types';

export interface TableDisplayProps extends TableDisplayData {
  page: number;
  pageSize: number;
  pageSet: React.Dispatch<React.SetStateAction<number>>;
  pageSizeSet: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  withDetails?: DetailSchema;
}

export const TableDisplay = ({
  rows,
  cols,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  total,
  withDetails,
}: TableDisplayProps) => {
  return (
    <Box p={1}>
      <Box mb={1}>
        <TableControls
          total={total}
          page={page}
          pageSet={pageSet}
          pageSize={pageSize}
          pageSizeSet={pageSizeSet}
        />
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
