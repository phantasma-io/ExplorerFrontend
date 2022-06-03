import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Grid } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { Link, Text } from 'components/display';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs, ExplorerRoutes } from 'types/routes';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export interface BreadcrumbsProps {
  tab: ExplorerTabs;
  route: ExplorerRoutes;
}

export const Breadcrumbs = ({ tab, route }: BreadcrumbsProps) => {
  const { echo, echoActiveId } = useEcho();
  const { query } = useRouter();

  return (
    <Box
      pt={{
        xs: route === '/nexus' ? 4 : 1,
        lg: route === '/nexus' ? 7.5 : 3.75,
      }}
      pb={1.5}
    >
      <Box pb={1} display={route === '/nexus' ? 'none' : 'inline-block'}>
        <Link
          variant="body1"
          href={routes['/nexus'](echoActiveId as Locales, {
            tab,
          })}
          sx={{
            color: '#fff',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Box pt={0.3}>
                <Typography
                  variant="body1"
                  sx={{ color: '#fff', fontWeight: 600 }}
                >
                  <ArrowBackIcon />
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Text>{echo('goback')}</Text>
            </Grid>
          </Grid>
        </Link>
      </Box>
      <Box>
        <Text
          variant={route === '/nexus' ? 'h4' : 'h5'}
          sx={{ color: '#fff' }}
          value={echo(`details-${query?.view as string}`)}
        />
      </Box>
    </Box>
  );
};
