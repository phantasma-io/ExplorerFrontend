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
  linkOptions,
  loading,
  error,
}: TableDisplayProps) => {
  const visibleCols = cols.filter((col) => !col.overviewOnly);
  const visibleRows = rows.map((row) =>
    row.filter((_, idx) => !cols[idx].overviewOnly),
  );

  return (
    <Box>
      {/* desktop */}
      <Box mb={1} display={{ xs: 'none', md: 'block' }}>
        <TableDisplayDesktop
          tableId={tableId}
          raw={raw}
          rows={visibleRows}
          cols={visibleCols}
          height={height}
          spacing={spacing}
          linkOptions={linkOptions}
          loading={loading}
          error={error}
        />
      </Box>
      {/* mobile */}
      <Box mb={1} display={{ xs: 'block', md: 'none' }}>
        <TableDisplayMobile
          rows={visibleRows}
          cols={visibleCols}
          spacing={spacing}
          height={height}
          loading={loading}
          error={error}
        />
      </Box>
    </Box>
  );
};
