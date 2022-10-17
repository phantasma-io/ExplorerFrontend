import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { AddressResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';

export interface AddressRawProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressRaw = ({ data, loading, error }: AddressRawProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (data?.addresses?.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Box>
        {data && <DetailsScript value={JSON.stringify(data, null, 2)} />}
      </Box>
    );
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
