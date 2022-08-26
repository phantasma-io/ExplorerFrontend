import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { ContractResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { Methods } from 'components/display';

export interface ContractMethodsProps {
  data?: ContractResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const ContractMethods = ({
  data,
  loading,
  error,
}: ContractMethodsProps) => {
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
        {data?.contracts && data?.contracts[0]?.methods && (
          <Methods data={data?.contracts[0]?.methods} />
        )}
      </Box>
    );
  }, [loading, error, data]);

  return <Box p={1}>{content}</Box>;
};
