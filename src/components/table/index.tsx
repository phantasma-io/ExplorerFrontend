import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { TableDisplayProps, TableUrlParams, TableParamControls } from 'types/table';
import { TABLE_HEIGHT, TABLE_SPACING } from 'cfg';
import { TableControls } from './Controls';
import { TableDisplay } from './Display';

export interface TableProps
  extends TableDisplayProps,
    TableParamControls,
    TableUrlParams {
  addon?: React.ReactNode;
  hideControls?: boolean;
  total?: number;
  cursor?: string | null;
  limit?: number;
  offset?: number;
  mode?: string;
  resetPagination?: () => void;
  onPageData?: (nextCursor: string | null | undefined, received: number) => void;
  with_total?: number;
  withTotal?: number;
}

export const Table = ({
  tableId,
  raw,
  rows,
  cols,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  orderBy,
  orderBySet,
  orderDirection,
  orderDirectionSet,
  hasNext,
  height = TABLE_HEIGHT,
  spacing = TABLE_SPACING,
  linkOptions,
  loading,
  error,
  addon,
  hideControls,
}: TableProps) => {
  const strData = useMemo(() => JSON.stringify(raw, null, 2), [raw]);

  return (
    <Box p={1} id={tableId}>
      {!hideControls &&
      <Box mb={1}>
        <TableControls
          tableId={tableId}
          exportData={strData}
          page={page}
          pageSet={pageSet}
          pageSize={pageSize}
          pageSizeSet={pageSizeSet}
          orderBy={orderBy}
          orderBySet={orderBySet}
          orderDirection={orderDirection}
          orderDirectionSet={orderDirectionSet}
          hasNext={hasNext}
          addon={addon}
        />
      </Box>
      }
      <Box>
        <TableDisplay
          tableId={tableId}
          raw={raw}
          rows={rows}
          cols={cols}
          height={height}
          spacing={spacing}
          linkOptions={linkOptions}
          loading={loading}
          error={error}
        />
      </Box>
    </Box>
  );
};
