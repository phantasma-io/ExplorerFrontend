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
import { useRouter } from 'next/router';
import { useEcho } from 'hooks/useEcho';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import { routes } from 'cfg';
import { Locales } from 'types/locales';

export interface SearchInputProps {
  white?: boolean;
  onApply?: () => void;
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

export const SearchInput: FC<SearchInputProps> = ({
  white,
  onApply,
}: SearchInputProps) => {
  const { push } = useRouter();

  const { echo, echoActiveId } = useEcho();

  const [inputValue, inputValueSet] = useState<string>('');

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      inputValueSet(e.target.value),
    [inputValueSet],
  );

  const clearInput = useCallback(() => inputValueSet(''), [inputValueSet]);

  const applySearch = useCallback(() => {
    if (inputValue && inputValue !== '') {
      const trimmed = inputValue.trim();
      push({
        pathname: routes['/search'](echoActiveId as Locales),
        query: { id: trimmed },
      });
      if (onApply) {
        onApply();
      }
    }
  }, [inputValue, echoActiveId, push, onApply]);

  if (white) {
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
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ),
              endAdornment: (
                <Tooltip title={echo('clear')}>
                  <IconButton size="small" onClick={() => clearInput()}>
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
        </Box>
      </ThemeProvider>
    );
  }

  return (
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
        InputProps={{
          startAdornment: (
            <Tooltip title={echo('search')}>
              <IconButton size="small" onClick={() => applySearch()}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          ),
          endAdornment: (
            <Tooltip title={echo('clear')}>
              <IconButton size="small" onClick={() => clearInput()}>
                <ClearAllIcon />
              </IconButton>
            </Tooltip>
          ),
        }}
      />
    </Box>
  );
};
