import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useSeriesData } from 'hooks/api';
import { SeriesResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';

export interface SeriesOverviewProps {
  data?: SeriesResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const SeriesOverview = ({
  data,
  loading,
  error,
}: SeriesOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useSeriesData(data);

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
        csvFilename={`PhantasmaExplorer-Series-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>{data && renderOverview(cols, rows)}</Box>
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw]);

  return <Box p={1}>{content}</Box>;
};
