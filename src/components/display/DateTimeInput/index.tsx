import React, { FC } from 'react';
import { TextField } from '@mui/material';

export interface DateTimeInputProps {
  label: string;
  onChange: () => void;
}

export const DateTimeInput: FC<DateTimeInputProps> = ({ label, onChange }) => {
  return (
    <div>
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
      />
    </div>
  );
};
