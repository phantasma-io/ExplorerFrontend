import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Link } from 'components/display';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useTheme } from '@mui/material/styles';
import { useI18n } from 'hooks';

/**
 * GetWallet
 */
export const GetWallet = () => {
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.info/wallets/" external>
          <Tooltip title={t('tooltip-dlwallet')}>
            <IconButton size="small">
              <AccountBalanceWalletIcon
                sx={{
                  fontSize: theme.typography.h5.fontSize,
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
