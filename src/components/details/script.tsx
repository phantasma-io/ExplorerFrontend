import React from 'react';
import { Text } from 'components/display';

export interface DetailsScriptProps {
  value: string;
  label?: string;
  height?: string;
}

export const DetailsScript = ({ value, label, height }: DetailsScriptProps) => {
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
      height={height}
    />
  );
};
