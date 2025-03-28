import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, NoSsr, Typography } from '@mui/material';
import {
  TableUrlParams,
  TableParamControls,
  TableViewModes,
} from 'types/table';
import { useEcho } from '@ricardojrmcom/echo';
import { numberFormat } from '@ricardojrmcom/dervish';
import { TablePageSize } from './PageSize';
import { TablePagination } from './Pagination';
import { TableViewMode } from './ViewMode';
import { TableExporter } from './Exporter';

export interface TableControlsProps extends TableUrlParams, TableParamControls {
  tableId: string;
  exportData: string;
  viewMode: TableViewModes;
  viewModeSet: React.Dispatch<React.SetStateAction<TableViewModes>>;
  addon?: React.ReactNode;
}

export const TableControls = ({
  tableId,
  exportData,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  total,
  viewMode,
  viewModeSet,
  addon,
}: TableControlsProps) => {
  const { echo } = useEcho();

  const csvFilename = useMemo(() => `${tableId}-${nanoid()}.csv`, [tableId]);

  const pageCount = useMemo(
    () => Math.ceil(total / pageSize),
    [pageSize, total],
  );

  const options = useMemo(() => [25, 50, 100], []);

  return (
    <Box>
      <NoSsr>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="center"
        >
          <Grid item xs={12} md="auto">
            <Grid
              container
              alignItems="center"
              alignContent="center"
              spacing={1}
            >
              <Grid item>
                <TablePageSize
                  options={options}
                  pageSize={pageSize}
                  pageSizeSet={pageSizeSet}
                  total={total}
                />
              </Grid>
              <Grid item>
                <TableViewMode viewMode={viewMode} viewModeSet={viewModeSet} />
              </Grid>
              <Grid item>
                <TableExporter data={exportData} filename={csvFilename} />
              </Grid>
              {addon && <Grid item>{addon}</Grid>}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md="auto"
            container
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <Box pb={0.39}>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  fontWeight={600}
                >
                  {`(${numberFormat(total)} ${echo('table-results')})`}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <TablePagination
                page={page}
                pageCount={pageCount}
                pageSet={pageSet}
              />
            </Grid>
          </Grid>
        </Grid>
      </NoSsr>
    </Box>
  );
};
