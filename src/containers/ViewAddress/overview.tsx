import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useAddressData } from 'hooks/api';
import { AddressResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';

export interface AddressOverviewProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressOverview = ({
  data,
  loading,
  error,
}: AddressOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useAddressData(data);

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
        csvFilename={`PhantasmaExplorer-Address-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>{data && renderOverview(cols, rows, data)}</Box>
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw]);

  return <Box p={1}>{content}</Box>;
};
