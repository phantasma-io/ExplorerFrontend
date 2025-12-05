import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import {
  TableDisplayProps,
  TableUrlParams,
  TableParamControls,
  TableViewModes,
} from 'types/table';
import { TABLE_HEIGHT, TABLE_SPACING } from 'cfg';
import { usePersistentState } from 'hooks/usePersistentState';
import { TableControls } from './Controls';
import { TableDisplay } from './Display';

export interface TableProps
  extends TableDisplayProps,
    TableParamControls,
    TableUrlParams {
  addon?: React.ReactNode;
  hideControls?: boolean,
}

export const Table = ({
  tableId,
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
  height = TABLE_HEIGHT,
  spacing = TABLE_SPACING,
  linkOptions,
  loading,
  error,
  addon,
  hideControls,
}: TableProps) => {
  const [viewMode, viewModeSet] = usePersistentState<TableViewModes>(
    'PhantasmaExplorer-table-viewMode',
    'desktop',
  );

  const strData = useMemo(() => JSON.stringify(raw, null, 2), [raw]);

  return (
    <Box p={1} id={tableId}>
      {!hideControls &&
      <Box mb={1}>
        <TableControls
          tableId={tableId}
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
          viewMode={viewMode}
          viewModeSet={viewModeSet}
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
          viewMode={viewMode}
        />
      </Box>
    </Box>
  );
};
