import React from 'react';
import { Text } from 'components/display';

export interface CellTextProps {
  value: string;
  label?: string;
}

export const CellText = ({ value, label }: CellTextProps) => {
  return (
    <Text
      value={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      clipboard
    />
  );
};
