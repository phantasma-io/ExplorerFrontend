import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { Link } from 'components/display';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useThemeMode } from 'containers/ThemeProvider';

/**
 * GetWallet
 */
export const GetWallet = () => {
  const { themeActive } = useThemeMode();
  const { echo } = useEcho();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.info/wallets/" external>
          <Tooltip title={echo('tooltip-dlwallet')}>
            <IconButton size="small">
              <AccountBalanceWalletIcon
              sx={{
                fontSize: themeActive.typography.h5.fontSize,
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
