import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useEventData } from 'hooks/api';
import { EventResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';

export interface EventOverviewProps {
  data?: EventResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const EventOverview = ({ data, loading, error }: EventOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useEventData(data);

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
        csvFilename={`PhantasmaExplorer-Event-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>{data && renderOverview(cols, rows)}</Box>
      </Overview>
    );
  }, [loading, error, rows, data, renderOverview, cols, raw]);

  return <Box p={1}>{content}</Box>;
};
