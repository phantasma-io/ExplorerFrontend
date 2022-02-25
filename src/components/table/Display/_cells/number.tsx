import React from 'react';
import { Text } from '../../../display/Text';

export interface CellNumberProps {
  value: number;
}

export const CellNumber = ({ value }: CellNumberProps) => {
  return (
    <Text
      formatNumber={value}
      variant="body2"
      wordBreak="break-all"
      clipboard
    />
  );
};
