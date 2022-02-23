import React from 'react';
import { Box } from '@mui/material';
import { TableControls } from './Controls';
import { TableDisplay, TableDisplayProps } from './Display';

export interface TableProps extends TableDisplayProps {
  page: number;
  pageSize: number;
  pageSet: React.Dispatch<React.SetStateAction<number>>;
  pageSizeSet: React.Dispatch<React.SetStateAction<number>>;
  total: number;
}

export const Table = ({
  rows,
  cols,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  total,
  withDetails = true,
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
        />
      </Box>
      <Box>
        <TableDisplay rows={rows} cols={cols} withDetails={withDetails} />
      </Box>
    </Box>
  );
};
