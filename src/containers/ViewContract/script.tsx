import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ContractResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';

export interface ContractScriptProps {
  data?: ContractResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const ContractScript = ({
  data,
  loading,
  error,
}: ContractScriptProps) => {
  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (data?.contracts?.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Box>
        {data?.contracts && data?.contracts[0]?.script_raw && (
          <DetailsScript value={data?.contracts[0]?.script_raw} />
        )}
      </Box>
    );
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
