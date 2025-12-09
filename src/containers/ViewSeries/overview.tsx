import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useEcho } from 'hooks/useEcho';
import { useSeriesData } from 'hooks/api';
import { SeriesResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';
import { MetadataBlock } from 'components/display';

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
  const { echo } = useEcho();

  const { cols, rows, raw } = useSeriesData(data);
  const seriesMetadata = data?.series?.[0]?.metadata;

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
        <MetadataBlock
          title={echo('metadata-series')}
          metadata={seriesMetadata}
        />
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw, echo, seriesMetadata]);

  return <Box p={1}>{content}</Box>;
};
