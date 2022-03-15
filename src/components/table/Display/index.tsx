import React from 'react';
import { Box } from '@mui/material';
import { TableDisplayProps } from 'types/table';
import { TableDisplayDesktop } from './Desktop';
import { TableDisplayMobile } from './Mobile';

export const TableDisplay = ({
  raw,
  tableId,
  rows,
  cols,
  height,
  spacing,
  withDetails,
  linkOptions,
  dialogOptions,
}: TableDisplayProps) => {
  return (
    <Box>
      {/* desktop */}
      <Box mb={1} display={{ xs: 'none', md: 'block' }}>
        <TableDisplayDesktop
          tableId={tableId}
          raw={raw}
          rows={rows}
          cols={cols}
          height={height}
          spacing={spacing}
          withDetails={withDetails}
          linkOptions={linkOptions}
          dialogOptions={dialogOptions}
        />
      </Box>
      {/* mobile */}
      <Box mb={1} display={{ xs: 'block', md: 'none' }}>
        <TableDisplayMobile />
      </Box>
    </Box>
  );
};
