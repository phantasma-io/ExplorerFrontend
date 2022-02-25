import React, { useMemo } from 'react';
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
    TableUrlParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: any;
}

export const Table = ({
  raw,
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
  const strData = useMemo(() => JSON.stringify(raw), [raw]);

  return (
    <Box p={1}>
      <Box mb={1}>
        <TableControls
          exportData={strData}
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
