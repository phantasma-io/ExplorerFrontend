import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Link } from 'components/display';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type Crumb = {
  text: string;
  link: string;
};

export interface BreadcrumbsProps {
  crumbs?: Crumb[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  const { echoActiveId } = useEcho();

  return (
    <Box pb={1} display={{ xs: 'none', lg: 'block' }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Link
            variant="body1"
            href={routes['/nexus'](echoActiveId as Locales)}
            sx={{ color: '#fff', fontWeight: 600 }}
          >
            Nexus
          </Link>
        </Grid>
        <Grid item>
          <Box pt={0.3}>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
              <NavigateNextIcon />
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pt={0.3}>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
              PAGE
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pt={0.3}>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
              <NavigateNextIcon />
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box pt={0.3}>
            <Typography variant="body1" sx={{ color: '#fff', fontWeight: 600 }}>
              TAB
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
