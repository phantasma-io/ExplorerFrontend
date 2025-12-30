import React, { useState, useCallback } from 'react';
import { Box, IconButton, Tooltip, Dialog, Paper } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { SearchInput } from 'components/display';
import SearchIcon from '@mui/icons-material/Search';
import { useThemeMode } from 'containers/ThemeProvider';

/**
 * Search
 */
export const Search = () => {
  const { themeActive } = useThemeMode();
  const { echo } = useEcho();

  const [openSearch, openSearchSet] = useState(false);
  const handleSearchOpen = useCallback(() => openSearchSet(true), []);
  const handleSearchClose = useCallback(() => openSearchSet(false), []);

  return (
    <Box>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Tooltip title={echo('tooltip-search')}>
          <IconButton size="small" onClick={handleSearchOpen}>
            <SearchIcon
              sx={{
                fontSize: themeActive.typography.h5.fontSize,
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
