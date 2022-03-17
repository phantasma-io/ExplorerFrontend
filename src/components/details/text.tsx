import React from 'react';
import { Text } from 'components/display';

export interface DetailsTextProps {
  value: string;
  label?: string;
}

export const DetailsText = ({ value, label }: DetailsTextProps) => {
  return (
    <Text
      value={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
    />
  );
};
