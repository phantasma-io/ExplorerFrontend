import React from 'react';
import { Box, Grid, Tooltip } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { routes } from 'cfg';
import { Image, Link } from 'components/display';
import { Locales } from 'types/locales';

/**
 * HomeNav
 */
export const HomeNav = () => {
  const { echo, echoActiveId } = useEcho();

  return (
    <Box>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Box pt={0.5}>
            <Link href={routes['/'](echoActiveId as Locales)}>
              <Tooltip title={echo('tooltip-nav-homepage')}>
                <>
                  <Box
                    display={{ xs: 'none', md: 'block' }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={'/static/v1/img/phantasma-logo-white.png'}
                      height={'24px'}
                      maxHeight={'24px'}
                    />
                  </Box>
                  <Box
                    display={{ xs: 'block', md: 'none' }}
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={'/static/v1/img/phantasma-logo-icon-white.png'}
                      height={'24px'}
                      maxHeight={'24px'}
                      title="Phantasma"
                      alt="Phantasma Explorer"
                    />
                  </Box>
                </>
              </Tooltip>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
