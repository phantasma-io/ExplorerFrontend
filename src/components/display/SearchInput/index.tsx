import React, { FC } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  ThemeProvider,
  ThemeOptions,
  createTheme,
  Theme,
} from '@mui/material';
import { useEcho } from '@ricardojrmcom/ace';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';

export interface SearchInputProps {
  label?: string;
}

const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    info: {
      main: '#fff',
    },
  },
};
const theme: Theme = createTheme(dark);

export const SearchInput: FC<SearchInputProps> = ({ label }) => {
  const { echo } = useEcho();

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <TextField
          // label={echo('search')}
          variant="standard"
          placeholder={echo('search')}
          size="small"
          fullWidth
          color="info"
          autoComplete={'off'}
          sx={{
            input: {
              color: '#fff',
            },
          }}
          InputProps={{
            startAdornment: (
              <Tooltip title={echo('search')}>
                <IconButton size="small">
                  <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
            ),
            endAdornment: (
              <Tooltip title={echo('clear')}>
                <IconButton size="small">
                  <ClearAllIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </Box>
    </ThemeProvider>
  );
};
