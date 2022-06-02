import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import { Link } from 'components/display';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

/**
 * GetWallet
 */
export const GetWallet = () => {
  const { furyActive } = useFury();
  const { echo } = useEcho();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.io/wallets/" external>
          <Tooltip title={echo('tooltip-dlwallet')}>
            <IconButton size="small">
              <AccountBalanceWalletIcon
                sx={{
                  fontSize: furyActive.typography.h5.fontSize,
                  color: '#fff',
                }}
              />
            </IconButton>
          </Tooltip>
        </Link>
      </Box>
    </Box>
  );
};
