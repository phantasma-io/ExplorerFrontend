import React from 'react';
import { Typography } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { Text } from 'components/display';
import CheckIcon from '@mui/icons-material/Check';

export interface CellBooleanProps {
  value: boolean;
  label?: string;
}

export const CellBoolean = ({ value, label }: CellBooleanProps) => {
  const { furyActive } = useFury();
  if (value) {
    return (
      <Text
        value={`${value}`}
        variant="body2"
        wordBreak="break-all"
        label={label}
        spacing={1}
      >
        <Typography variant="body2" color="primary">
          <CheckIcon style={{ height: furyActive.typography.h6.fontSize }} />
        </Typography>
      </Text>
    );
  }
  return null;
};
