import React from 'react';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useBlockData } from 'hooks/api';
import { BlockResults } from 'types/api';

export interface BlockOverviewProps {
  data?: BlockResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const BlockOverview = ({ data }: BlockOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows } = useBlockData(data);

  return <Box p={1}>{data && renderOverview(cols, rows)}</Box>;
};
