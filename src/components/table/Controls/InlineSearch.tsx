import React, { useCallback } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { useEcho } from 'hooks/useEcho';

export interface InlineSearchProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (val: string) => void;
  placeholder?: string;
}

export const InlineSearch = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}: InlineSearchProps) => {
  const { echo } = useEcho();

  const clear = useCallback(() => {
    onChange('');
    onSubmit('');
  }, [onChange, onSubmit]);

  const submit = useCallback(() => onSubmit(value), [onSubmit, value]);

  return (
    <Box width="100%" maxWidth={360}>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || echo('search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title={echo('search')}>
                <IconButton size="small" onClick={submit}>
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <Tooltip title={echo('clear')}>
                <IconButton size="small" onClick={clear}>
                  <ClearAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : undefined,
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            submit();
          }
        }}
      />
    </Box>
  );
};
