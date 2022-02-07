import React, { useState, useMemo } from 'react';
import { Story, Meta } from '@storybook/react';
import { Box, Grid } from '@mui/material';
import { TableEncoder, TableEncoderProps } from '.';
import { TablePageSize } from '../PageSize';
import { TablePagination } from '../Pagination';

export default {
  title: 'Components/Table/Encoder',
  component: TableEncoder,
  parameters: {
    componentSubtitle: 'Table Encoder Component',
    nextRouter: {
      pathname: '/[locale]/[view]',
      asPath: '/en/nexus',
      query: {
        tab: 'addresses',
      },
    },
  },
} as Meta;

export const Default: Story<TableEncoderProps> = () => {
  const [page, pageSet] = useState(1);
  const [pageSize, pageSizeSet] = useState(50);

  const params = useMemo(() => ({ page, pageSize }), [page, pageSize]);

  const total = useMemo(() => 1000, []);

  return (
    <Box>
      <TableEncoder params={params} />
      <Grid container justifyContent="space-between">
        <Grid item>
          <TablePagination
            page={page}
            pageSize={pageSize}
            pageSet={pageSet}
            total={total}
          />
        </Grid>
        <Grid item>
          <TablePageSize
            options={[25, 50, 100]}
            pageSize={pageSize}
            pageSizeSet={pageSizeSet}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
