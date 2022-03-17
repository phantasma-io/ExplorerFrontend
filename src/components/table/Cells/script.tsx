import React from 'react';
import { Text } from 'components/display';

export interface CellScriptProps {
  value: string;
  label?: string;
}

export const CellScript = ({ value, label }: CellScriptProps) => {
  return (
    <Text
      value={value}
      variant="body2"
      wordBreak="break-all"
      label={label}
      spacing={1}
      clipboard
      monospace
      script
    />
  );
};
