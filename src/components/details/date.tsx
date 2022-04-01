import React from 'react';
import { Text } from 'components/display';
import { DATE_SHORT, DATE_FORMAT } from 'cfg/formats';

export interface DetailsDateProps {
  value: Date;
  label?: string;
  short?: boolean;
  height?: string;
}

export const DetailsDate = ({
  value,
  label,
  short,
  height,
}: DetailsDateProps) => {
  return (
    <Text
      formatDate={value}
      formatDateStr={short ? DATE_SHORT : DATE_FORMAT}
      formatDateIcon={!short}
      variant="body2"
      label={label}
      spacing={1}
      height={height}
    />
  );
};
