import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import { useFury } from '@ricardo-jrm/fury';
import { useEcho } from '@ricardo-jrm/echo';
import { routes, Locales } from '../../cfg';
import { Link } from '../Link';

export const TempNav = () => {
  const { furyActive } = useFury();
  const { echoActiveId } = useEcho();

  return (
    <Box mt={6}>
      <Paper>
        <Box p={3}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/nexus'](echoActiveId as Locales)}
              >
                nexus
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/chain'](echoActiveId as Locales)}
              >
                chain
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/address'](echoActiveId as Locales, {
                  id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
                })}
              >
                address
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/block'](echoActiveId as Locales, {
                  id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
                })}
              >
                block
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/transaction'](echoActiveId as Locales, {
                  id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
                })}
              >
                transaction
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/contract'](echoActiveId as Locales, {
                  id: 'account',
                  tab: 'overview',
                })}
              >
                contract
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/token'](echoActiveId as Locales, {
                  id: 'soul',
                  tab: 'overview',
                })}
              >
                token
              </Link>
            </Grid>
            <Grid item>
              <Link
                sx={{ color: furyActive.palette.primary.main }}
                href={routes['/dao'](echoActiveId as Locales, {
                  id: 'masters',
                  tab: 'overview',
                })}
              >
                dao
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
