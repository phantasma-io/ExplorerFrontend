import React from 'react';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useTokenData } from 'hooks/api';
import { TokenResults } from 'types/api';

export interface TokenOverviewProps {
  data?: TokenResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TokenOverview = ({ data }: TokenOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows } = useTokenData(data);

  return <Box p={1}>{data && renderOverview(cols, rows)}</Box>;
};
