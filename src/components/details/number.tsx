import React from 'react';
import { Text } from 'components/display';

export interface DetailsNumberProps {
  value: number | string;
  label?: string;
  height?: string;
  append?: string;
}

export const DetailsNumber = ({
  value,
  label,
  height,
  append,
}: DetailsNumberProps) => {
  return (
    <Text
      formatNumber={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      height={height}
      append={append}
    />
  );
};
