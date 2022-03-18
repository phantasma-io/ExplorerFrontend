import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid } from '@mui/material';
import { Text } from 'components/display';
import { Address, AddressResults } from 'types/api';

export interface AddressBalancesProps {
  data?: AddressResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const AddressBalances = ({ data }: AddressBalancesProps) => {
  const balances = useMemo<Address['balances']>(() => {
    if (data?.addresses && data.addresses[0] && data.addresses[0].balances) {
      return data.addresses[0].balances;
    }
    return undefined;
  }, [data]);

  if (balances) {
    return (
      <Box p={1}>
        {balances.map((item) => (
          <Box p={1}>
            <Grid item container xs={12} spacing={1} key={nanoid()}>
              {item?.amount && (
                <Text
                  variant="body2"
                  label={item?.token?.symbol}
                  formatNumber={parseInt(item.amount, 10)}
                  spacing={1}
                />
              )}
            </Grid>
          </Box>
        ))}
      </Box>
    );
  }

  return null;
};
