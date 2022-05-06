import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useTransactionData } from 'hooks/api';
import { TransactionResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';

export interface TransactionOverviewProps {
  data?: TransactionResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TransactionOverview = ({
  data,
  loading,
  error,
}: TransactionOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useTransactionData(data);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (rows.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Overview
        csvFilename={`PhantasmaExplorer-Transaction-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>{data && renderOverview(cols, rows)}</Box>
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw]);

  return <Box p={1}>{content}</Box>;
};
