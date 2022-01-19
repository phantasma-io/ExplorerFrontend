import React from 'react';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { Box, Grid, Button } from '@mui/material';
import { Fullscreen, Text, Image } from '../../components';
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '../../cfg';

/**
 * ViewHome
 */
export const ViewHome = () => {
  const { furyActive } = useFury();
  const { echo } = useEcho();

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
          <Box py={1.5}>
            <Text variant="h2" sx={{ color: '#fff' }} align="center">
              Phantasma Chain Explorer
            </Text>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box pt={3} textAlign="center">
            <Button size="large" variant="contained" color="secondary">
              {echo('btn-enterNexus')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Fullscreen>
  );
};
