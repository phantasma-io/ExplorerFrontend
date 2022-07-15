import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { PlatformResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';

export interface PlatformRawProps {
  data?: PlatformResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const PlatformRaw = ({ data, loading, error }: PlatformRawProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (data?.platforms?.length === 0 && !loading) {
      return <Empty />;
    }

    return <Box>{data && <DetailsScript value={JSON.stringify(data)} />}</Box>;
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
