import React from 'react';
import { Text } from 'components/display';

export interface CellDateProps {
  value: Date;
  label?: string;
}

export const CellDate = ({ value, label }: CellDateProps) => {
  return (
    <Text
      formatDate={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
    />
  );
};
