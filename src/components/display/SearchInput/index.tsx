import React, { FC, useState, useCallback } from 'react';
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

export interface SearchInputProps {}

const dark: ThemeOptions = {
  palette: {
    mode: 'dark',
    info: {
      main: '#fff',
    },
  },
};
const theme: Theme = createTheme(dark);

export const SearchInput: FC<SearchInputProps> = () => {
  const { echo } = useEcho();

  const [inputValue, inputValueSet] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      inputValueSet(e.target.value),
    [inputValueSet],
  );

  const clearInput = useCallback(() => inputValueSet(''), [inputValueSet]);

  const applySearch = useCallback(() => {
    console.log({ inputValue });
  }, [inputValue]);

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
          value={inputValue}
          onChange={(e) => handleChange(e)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              applySearch();
            }
          }}
          sx={{
            input: {
              color: '#fff',
            },
          }}
          InputProps={{
            startAdornment: (
              <Tooltip title={echo('search')}>
                <IconButton size="small" onClick={() => applySearch()}>
                  <SearchIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Tooltip>
            ),
            endAdornment: (
              <Tooltip title={echo('clear')}>
                <IconButton size="small" onClick={() => clearInput()}>
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
