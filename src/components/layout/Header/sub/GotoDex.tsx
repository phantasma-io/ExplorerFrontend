import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Link } from 'components/display';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useTheme } from '@mui/material/styles';
import { useI18n } from 'hooks';

/**
 * GotoDex
 */
export const GotoDex = () => {
  const theme = useTheme();
  const { t } = useI18n();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.info/soul-swap" external>
          <Tooltip title={t('tooltip-gotodex')}>
            <IconButton size="small">
              <SwapHorizIcon
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
