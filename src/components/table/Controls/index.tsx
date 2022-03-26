import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, NoSsr, Typography } from '@mui/material';
import { TableUrlParams, TableParamControls } from 'types/table';
import { useEcho } from '@ricardo-jrm/echo';
import { numberFormat } from '@ricardo-jrm/dervish';
import { TableEncoder } from './Encoder';
import { TablePageSize } from './PageSize';
import { TablePagination } from './Pagination';
import { TableExporter } from './Exporter';
import { TableFilters } from './Filters';

export interface TableControlsProps extends TableUrlParams, TableParamControls {
  tableId: string;
  exportData: string;
}

export const TableControls = ({
  tableId,
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
  const { echo } = useEcho();

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

  const csvFilename = useMemo(() => `${tableId}-${nanoid()}.csv`, [tableId]);

  const pageCount = useMemo(
    () => Math.ceil(total / pageSize),
    [pageSize, total],
  );

  const options = useMemo(() => [25, 50, 100], []);

  return (
    <Box>
      <NoSsr>
        {/* <TableEncoder params={params} /> */}
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
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
                <TableExporter data={exportData} filename={csvFilename} />
              </Grid>
              <Grid item>
                <TableFilters />
              </Grid>
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
