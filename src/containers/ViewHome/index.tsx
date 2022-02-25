import React from 'react';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, Button } from '@mui/material';
import { Fullscreen, Image, Link } from 'components';
import { FOOTER_HEIGHT, HEADER_HEIGHT, routes } from 'cfg';
import { Locales } from 'types/locales';

/**
 * ViewHome
 */
export const ViewHome = () => {
  const { furyActive } = useFury();
  const { echo, echoActiveId } = useEcho();

  return (
    <Fullscreen subtract={HEADER_HEIGHT + FOOTER_HEIGHT}>
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
      >
        <Grid item xs={12}>
          <Box textAlign="center">
            <Image
              src="/static/v1/img/phantasma-logo-icon-white.png"
              responsive
              height={furyActive.typography.h1.fontSize as string}
              title="Phantasma Team"
              alt="Phantasma.io"
            />
          </Box>
        </Grid>
        <Grid item>
          <Box py={1.5} textAlign="center">
            <Image
              src="/static/v1/img/explorer-title-white.png"
              responsive
              title="Phantasma Explorer"
              alt="Phantasma Explorer"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pt={3} textAlign="center">
            <Link
              href={routes['/nexus'](echoActiveId as Locales)}
              sx={{ textDecoration: 'none' }}
            >
              <Button size="large" variant="contained" color="primary">
                {echo('btn-enterNexus')}
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Fullscreen>
  );
};
