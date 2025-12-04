import React from 'react';
import { Box } from '@mui/material';
import {
  TableDisplayProps,
  TableUrlParams,
  TableParamControls,
  TableViewModes,
} from 'types/table';
import { TABLE_HEIGHT, TABLE_SPACING } from 'cfg';
import { useLocalStorage } from 'hooks';
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
  withDetails = true,
  height = TABLE_HEIGHT,
  spacing = TABLE_SPACING,
  linkOptions,
  dialogOptions,
  loading,
  error,
  addon,
  hideControls,
}: TableProps) => {
  const [viewMode, viewModeSet] = useLocalStorage<TableViewModes>(
    'PhantasmaExplorer-table-viewMode',
    'desktop',
  );

  return (
    <Box p={1} id={tableId}>
      {!hideControls &&
      <Box mb={1}>
        <TableControls
          tableId={tableId}
          exportData={Array.isArray(raw) ? raw : []}
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
          withDetails={withDetails}
          height={height}
          spacing={spacing}
          linkOptions={linkOptions}
          dialogOptions={dialogOptions}
          loading={loading}
          error={error}
          viewMode={viewMode}
        />
      </Box>
    </Box>
  );
};
