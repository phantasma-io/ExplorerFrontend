import React from 'react';
import { Text } from 'components/display';

export interface DetailsNumberProps {
  value: number;
  label?: string;
}

export const DetailsNumber = ({ value, label }: DetailsNumberProps) => {
  return (
    <Text
      formatNumber={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
    />
  );
};
