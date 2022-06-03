import React, { useState, useCallback } from 'react';
import { Box, IconButton, Tooltip, Dialog, Paper } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import { SearchInput } from 'components/display';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Search
 */
export const Search = () => {
  const { furyActive } = useFury();
  const { echo } = useEcho();

  const [openSearch, openSearchSet] = useState(false);
  const handleSearchOpen = useCallback(() => openSearchSet(true), []);
  const handleSearchClose = useCallback(() => openSearchSet(false), []);

  return (
    <Box>
      <Box display={{ xs: 'block', lg: 'none' }}>
        <Tooltip title={echo('tooltip-search')}>
          <IconButton size="small" onClick={handleSearchOpen}>
            <SearchIcon
              sx={{
                fontSize: furyActive.typography.h5.fontSize,
                color: '#fff',
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        open={openSearch}
        onClose={handleSearchClose}
        maxWidth="md"
        fullWidth
      >
        <Paper>
          <Box p={2}>
            <SearchInput onApply={handleSearchClose} />
          </Box>
        </Paper>
      </Dialog>
    </Box>
  );
};
