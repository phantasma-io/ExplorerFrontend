import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Text } from 'components/display';
import {
  DATE_SHORT,
  DATE_FORMAT,
  DATE_FORMAT_UTC,
  DATE_FORMAT_UTC_24,
  DATE_SHORT_24,
  DATE_FORMAT_24,
} from 'cfg/formats';
import { useDatetimeOpts } from 'hooks/datetime/useDatetimeOpts';

dayjs.extend(utc);

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
  const { dtOpts } = useDatetimeOpts();

  const content = useMemo(() => {
    switch (dtOpts) {
      case 'unix':
        return (
          <Text
            value={`${dayjs(value).unix()}`}
            clipboard={!short}
            variant="body2"
            label={label}
            spacing={1}
            height={height}
          />
        );
      case 'utc':
        return (
          <Text
            formatDate={dayjs.utc(value).toDate()}
            formatDateStr={short ? DATE_SHORT : DATE_FORMAT_UTC}
            formatDateIcon={!short}
            variant="body2"
            label={label}
            spacing={1}
            height={height}
          />
        );
      case 'utc-24':
        return (
          <Text
            formatDate={dayjs.utc(value).toDate()}
            formatDateStr={short ? DATE_SHORT_24 : DATE_FORMAT_UTC_24}
            formatDateIcon={!short}
            variant="body2"
            label={label}
            spacing={1}
            height={height}
          />
        );
      case 'local-24':
        return (
          <Text
            formatDate={value}
            formatDateStr={short ? DATE_SHORT_24 : DATE_FORMAT_24}
            formatDateIcon={!short}
            variant="body2"
            label={label}
            spacing={1}
            height={height}
          />
        );
      case 'local':
      default:
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
    }
  }, [dtOpts, value, label, short, height]);

  return <>{content}</>;
};
