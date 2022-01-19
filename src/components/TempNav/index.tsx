import React from 'react';
import { Paper, Box, Grid } from '@mui/material';
import { routes } from '../../cfg';
import { Link } from '../Link';

export const TempNav = () => {
  return (
    <Box mt={6}>
      <Paper>
        <Box p={3}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Link href={routes['/nexus']()}>nexus</Link>
            </Grid>
            <Grid item>
              <Link href={routes['/chain']()}>chain</Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/address']({
                  id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
                })}
              >
                address
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/block']({
                  id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
                })}
              >
                block
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/transaction']({
                  id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
                })}
              >
                transaction
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/contract']({
                  id: 'account',
                  tab: 'overview',
                })}
              >
                contract
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/token']({
                  id: 'soul',
                  tab: 'overview',
                })}
              >
                token
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={routes['/dao']({
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
