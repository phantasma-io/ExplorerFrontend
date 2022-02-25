import React, { useMemo } from 'react';
import { Box, Grid, NoSsr } from '@mui/material';
import { TableUrlParams, TableParamControls } from 'types/table';
import { TableEncoder } from './Encoder';
import { TablePageSize } from './PageSize';
import { TablePagination } from './Pagination';
import { TableExporter } from './Exporter';

export interface TableControlsProps extends TableUrlParams, TableParamControls {
  exportData: string;
}

export const TableControls = ({
  exportData,
  page,
  pageSet,
  pageSize,
  pageSizeSet,
  orderBy,
  orderBySet,
  orderDirection,
  orderDirectionSet,
  filters,
  total,
}: TableControlsProps) => {
  const params = useMemo<TableUrlParams>(
    () => ({
      page,
      pageSize,
      orderBy,
      orderBySet,
      orderDirection,
      orderDirectionSet,
      total,
      filters,
    }),
    [
      page,
      pageSize,
      orderBy,
      orderBySet,
      orderDirection,
      orderDirectionSet,
      total,
      filters,
    ],
  );

  const pageCount = useMemo(
    () => Math.floor(total / pageSize),
    [pageSize, total],
  );

  const options = useMemo(() => [25, 50, 100], []);

  return (
    <Box>
      <NoSsr>
        <TableEncoder params={params} />
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
          <Grid item xs={12} md="auto">
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <TablePageSize
                  options={options}
                  pageSize={pageSize}
                  pageSizeSet={pageSizeSet}
                  total={total}
                />
              </Grid>
              {/* <Grid item></Grid> */}
              <Grid item>
                <TableExporter data={exportData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md="auto">
            <TablePagination
              page={page}
              pageCount={pageCount}
              pageSet={pageSet}
            />
          </Grid>
        </Grid>
      </NoSsr>
    </Box>
  );
};
