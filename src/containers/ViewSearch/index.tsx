import React from 'react';
import { Box } from '@mui/material';
import { SearchResults } from 'components/list';

export interface ViewSearchProps {}

export const ViewSearch = () => {
  return (
    <Box>
      <SearchResults />
    </Box>
  );
};
