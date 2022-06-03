import React, { FC } from 'react';
import { Box, TextField } from '@mui/material';

export interface DateTimeInputProps {
  label?: string;
  onChange: () => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ label, onChange }) => {
  return (
    <Box>
      <TextField
        id="datetime-local"
        label={label}
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        color="primary"
        onChange={onChange}
        fullWidth
        size="small"
      />
    </Box>
  );
};
