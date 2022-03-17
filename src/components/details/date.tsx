import React from 'react';
import { Text } from 'components/display';

export interface DetailsDateProps {
  value: Date;
  label?: string;
}

export const DetailsDate = ({ value, label }: DetailsDateProps) => {
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
