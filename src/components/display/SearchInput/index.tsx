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
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { useI18n } from 'hooks';

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

  const { t, locale } = useI18n();

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
        pathname: routes['/search'](locale as Locales),
        query: { id: trimmed },
      });
      if (onApply) {
        onApply();
      }
    }
  }, [inputValue, locale, push, onApply]);

  if (white) {
    return (
      <ThemeProvider theme={theme}>
        <Box>
          <TextField
            // label={t('search')}
            variant="standard"
            placeholder={t('search')}
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
                <Tooltip title={t('search')}>
                  <IconButton size="small" onClick={() => applySearch()}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              ),
              endAdornment: (
                <Tooltip title={t('clear')}>
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
        // label={t('search')}
        variant="standard"
        placeholder={t('search')}
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
            <Tooltip title={t('search')}>
              <IconButton size="small" onClick={() => applySearch()}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          ),
          endAdornment: (
            <Tooltip title={t('clear')}>
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
