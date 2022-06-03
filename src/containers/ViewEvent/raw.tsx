import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { EventResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';

export interface EventRawProps {
  data?: EventResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const EventRaw = ({ data, loading, error }: EventRawProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (data?.events?.length === 0 && !loading) {
      return <Empty />;
    }

    return <Box>{data && <DetailsScript value={JSON.stringify(data)} />}</Box>;
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
