import React from 'react';
import { Typography } from '@mui/material';
import { useThemeMode } from 'containers/ThemeProvider';
import { Text } from 'components/display';
import CheckIcon from '@mui/icons-material/Check';

export interface DetailsBooleanProps {
  value: boolean;
  label?: string;
  height?: string;
}

export const DetailsBoolean = ({
  value,
  label,
  height,
}: DetailsBooleanProps) => {
  const { themeActive } = useThemeMode();
  if (value) {
    return (
      <Text
        value={`${value}`}
        variant="body2"
        wordBreak="break-all"
        label={label}
        spacing={1}
        height={height}
      >
        <Typography variant="body2" color="primary">
          <CheckIcon style={{ height: themeActive.typography.h6.fontSize }} />
        </Typography>
      </Text>
    );
  }
  return null;
};
