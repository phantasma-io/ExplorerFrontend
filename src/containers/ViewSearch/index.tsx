import React from 'react';
import { Box } from '@mui/material';
import { Breadcrumbs } from 'components/layout';
import { SearchResults } from 'components/list';

export interface ViewSearchProps {}

export const ViewSearch = () => {
  return (
    <Box>
      <Box>
        <Breadcrumbs tab="addresses" route="/search" />
      </Box>
      <Box>
        <SearchResults />
      </Box>
    </Box>
  );
};
