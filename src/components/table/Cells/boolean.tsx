import React from 'react';
import { Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export interface CellBooleanProps {
  value: boolean;
}

export const CellBoolean = ({ value }: CellBooleanProps) => {
  if (value) {
    return (
      <Typography variant="body2" color="primary">
        <CheckIcon />
      </Typography>
    );
  }
  return null;
};
