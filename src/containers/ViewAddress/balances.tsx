import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useEcho } from '@ricardojrmcom/echo';
import { Box, Grid } from '@mui/material';
import { Text } from 'components/display';
import { Address, AddressResults } from 'types/api';
import { Locales } from 'types/locales';
import { routes } from 'cfg';
import { parseDecimals } from 'scripts';

export interface AddressBalancesProps {
  data?: AddressResults;
  address?: Address;
}

export const AddressBalances = ({ data, address }: AddressBalancesProps) => {
  const { echo, echoActiveId } = useEcho();

  const balances = useMemo<Address['balances']>(() => {
    if (address) {
      return address?.balances;
    }

    if (data?.addresses && data.addresses[0] && data.addresses[0].balances) {
      return data.addresses[0].balances;
    }
    return undefined;
  }, [data, address]);

  if (balances && balances.length) {
    return (
      <Box py={0.6}>
        <Box mb={1.5}>
          <Text
            variant="body2"
            value={`${echo('tab-balances')}:`}
            fontWeight={600}
          />
        </Box>
        {balances.map((item) => {
          if (item?.amount) {
            const { number, format } = parseDecimals(
              item.amount,
              item?.token?.decimals || 0,
            );
            return (
              <Box px={2} py={0.6} key={nanoid()}>
                <Grid item container xs={12} spacing={1}>
                  <Text
                    variant="body2"
                    label={item?.token?.symbol}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    formatNumber={number}
                    formatNumberStr={format}
                    spacing={1}
                    linkOptions={{
                      link: routes['/token'](echoActiveId as Locales, {
                        id: item?.token?.symbol,
                      }),
                      title: echo('explore-token'),
                    }}
                  />
                </Grid>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    );
  }

  return null;
};
