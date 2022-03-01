import React from 'react';
import { Text } from 'components/display';

export interface CellDateProps {
  value: Date;
}

export const CellDate = ({ value }: CellDateProps) => {
  return <Text formatDate={value} variant="body2" wordBreak="break-all" />;
};
