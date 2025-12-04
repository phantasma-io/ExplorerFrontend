import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import { Image, Link } from 'components/display';
import { Fullscreen } from 'components/layout';
import { FOOTER_HEIGHT, HEADER_HEIGHT, routes } from 'cfg';
import { Locales } from 'types/locales';
import { useI18n } from 'hooks';

/**
 * ViewHome
 */
export const ViewHome = () => {
  const { t, locale } = useI18n();

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
              height="99px"
              title="Phantasma Explorer"
              alt="Phantasma Explorer"
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
              href={routes['/nexus'](locale as Locales)}
              sx={{ textDecoration: 'none' }}
            >
              <Button size="large" variant="contained" color="primary">
                {t('btn-enterNexus')}
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Fullscreen>
  );
};
