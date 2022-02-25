import React from 'react';
import { Box } from '@mui/material';
import {
  TableDisplayProps,
  TableUrlParams,
  TableParamControls,
} from 'types/table';
import { TABLE_HEIGHT, TABLE_SPACING } from 'cfg';
import { TableControls } from './Controls';
import { TableDisplay } from './Display';

export interface TableProps
  extends TableDisplayProps,
    TableParamControls,
    TableUrlParams {}

export const Table = ({
  rows,
  cols,
  total,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  orderBy,
  orderBySet,
  orderDirection,
  orderDirectionSet,
  filters,
  withDetails = true,
  height = TABLE_HEIGHT,
  spacing = TABLE_SPACING,
}: TableProps) => {
  return (
    <Box p={1}>
      <Box mb={1}>
        <TableControls
          total={total}
          page={page}
          pageSet={pageSet}
          pageSize={pageSize}
          pageSizeSet={pageSizeSet}
          orderBy={orderBy}
          orderBySet={orderBySet}
          orderDirection={orderDirection}
          orderDirectionSet={orderDirectionSet}
          filters={filters}
        />
      </Box>
      <Box>
        <TableDisplay
          rows={rows}
          cols={cols}
          withDetails={withDetails}
          height={height}
          spacing={spacing}
        />
      </Box>
    </Box>
  );
};
