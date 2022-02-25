import React from 'react';
import { Text } from 'components/display';

export interface CellTextProps {
  value: string;
}

export const CellText = ({ value }: CellTextProps) => {
  return <Text value={value} variant="body2" wordBreak="break-all" clipboard />;
};
