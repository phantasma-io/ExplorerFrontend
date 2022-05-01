import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, NoSsr, Typography } from '@mui/material';
import { TableUrlParams, TableParamControls } from 'types/table';
import { useEcho } from '@ricardojrmcom/echo';
import { numberFormat } from '@ricardojrmcom/dervish';
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
  total,
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
