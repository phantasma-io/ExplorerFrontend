import React, { useState, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { TableParams } from '../../../types/table';
import { usePageParams } from '../../../hooks';
import { TableEncoder } from '../Encoder';
import { TablePageSize } from '../PageSize';
import { TablePagination } from '../Pagination';

export interface TableControllerProps {
  total: number;
}

export const TableController = ({ total }: TableControllerProps) => {
  const { pageParam, pageSizeParam } = usePageParams();

  const [page, pageSet] = useState(pageParam);
  const [pageSize, pageSizeSet] = useState(pageSizeParam);

  const params = useMemo<TableParams>(
    () => ({ page, pageSize }),
    [page, pageSize],
  );

  return (
    <Box>
      {/* <TableEncoder params={params} /> */}
      <Grid container justifyContent={{ xs: 'center', md: 'space-between' }}>
        <Grid item xs={12} md="auto">
          <TablePageSize
            options={[25, 50, 100]}
            pageSize={pageSize}
            pageSizeSet={pageSizeSet}
          />
        </Grid>
        <Grid item xs={12} md="auto">
          <TablePagination
            page={page}
            pageSize={pageSize}
            pageSet={pageSet}
            total={total}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
