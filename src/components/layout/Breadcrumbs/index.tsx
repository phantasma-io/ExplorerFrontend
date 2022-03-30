import React from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, Grid } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Link } from 'components/display';
import { routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerTabs } from 'types/routes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export interface BreadcrumbsProps {
  tab: ExplorerTabs;
  label: string;
}

export const Breadcrumbs = ({ tab, label }: BreadcrumbsProps) => {
  const { echoActiveId } = useEcho();
  const { query } = useRouter();

  return (
    <Box pb={1} display={{ xs: 'none', lg: 'block' }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Link
            variant="body1"
            href={routes['/nexus'](echoActiveId as Locales, {
              tab,
            })}
            sx={{ color: '#fff', fontWeight: 600 }}
          >
            {label}
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
              {query?.id || ''}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
