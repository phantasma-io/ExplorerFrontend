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
        xs: 1,
        lg: 3.75,
      }}
      pb={1.5}
    >
      <Box>
        <Text
          variant= 'h6'
          sx={{ color: '#fff' }}
          value={echo(`details-${query?.view as string}`)}
        />
      </Box>
    </Box>
  );
};
