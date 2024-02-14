import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { Text } from 'components/display';
import { ExplorerTabs, ExplorerRoutes } from 'types/routes';

export interface BreadcrumbsProps {
  tab: ExplorerTabs;
  route: ExplorerRoutes;
}

export const Breadcrumbs = ({ tab, route }: BreadcrumbsProps) => {
  const { echo } = useEcho();
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
          variant='h6'
          sx={{ color: '#fff' }}
          value={echo(`details-${query?.view as string}`)}
        />
      </Box>
    </Box>
  );
};
