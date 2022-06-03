import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { TokenResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';

export interface TokenScriptProps {
  data?: TokenResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TokenScript = ({ data, loading, error }: TokenScriptProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (data?.tokens?.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Box>
        {data?.tokens && data?.tokens[0]?.script_raw && (
          <DetailsScript value={data?.tokens[0]?.script_raw} />
        )}
      </Box>
    );
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
