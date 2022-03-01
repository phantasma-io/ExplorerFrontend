import React from 'react';
import { Typography } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import CheckIcon from '@mui/icons-material/Check';

export interface CellBooleanProps {
  value: boolean;
}

export const CellBoolean = ({ value }: CellBooleanProps) => {
  const { furyActive } = useFury();
  if (value) {
    return (
      <Typography variant="body2" color="primary">
        <CheckIcon style={{ height: furyActive.typography.h6.fontSize }} />
      </Typography>
    );
  }
  return null;
};
