import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useFury } from '@ricardojrmcom/fury';
import { useEcho } from '@ricardojrmcom/echo';
import { Link } from 'components/display';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

/**
 * GotoDex
 */
export const GotoDex = () => {
  const { furyActive } = useFury();
  const { echo } = useEcho();

  return (
    <Box>
      <Box>
        <Link href="https://phantasma.info/soul-swap" external>
          <Tooltip title={echo('tooltip-gotodex')}>
            <IconButton size="small">
              <SwapHorizIcon
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
