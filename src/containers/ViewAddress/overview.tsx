import React from 'react';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useAddressData } from 'hooks/api';
import { AddressResults } from 'types/api';

export interface AddressOverviewProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressOverview = ({ data }: AddressOverviewProps) => {
  const renderOverview = useRenderOverview();

  const { cols, rows } = useAddressData(data);

  return <Box p={1}>{data && renderOverview(cols, rows)}</Box>;
};
