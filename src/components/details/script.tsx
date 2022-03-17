import React from 'react';
import { Text } from 'components/display';

export interface DetailsScriptProps {
  value: string;
  label?: string;
}

export const DetailsScript = ({ value, label }: DetailsScriptProps) => {
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
