import React from 'react';
import { useFury } from '@ricardo-jrm/fury';
import { Box, Grid, Button } from '@mui/material';
import { Fullscreen, Text, Image } from '../../components';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../cfg';

/**
 * ViewHome
 */
export const ViewHome = () => {
  const { furyActive } = useFury();

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
              src="/static/v1/img/explorer-logo.png"
              responsive
              height={furyActive.typography.h1.fontSize as string}
            />
          </Box>
        </Grid>
        <Grid item>
          <Text variant="h2" sx={{ color: '#fff' }} align="center">
            Phantasma Chain Explorer
          </Text>
        </Grid>
        <Grid item xs={12}>
          <Box pt={3} textAlign="center">
            <Button
              size="large"
              variant="contained"
              color="secondary"
              sx={{ fontSize: furyActive.typography.h6.fontSize }}
            >
              Enter the Nexus
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fullscreen>
  );
};
