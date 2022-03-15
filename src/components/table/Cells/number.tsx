import React from 'react';
import { Text } from 'components/display';

export interface CellNumberProps {
  value: number;
  label?: string;
}

export const CellNumber = ({ value, label }: CellNumberProps) => {
  return (
    <Text
      formatNumber={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      clipboard
    />
  );
};
