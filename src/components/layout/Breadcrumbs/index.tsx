import React from 'react';
import { Box } from '@mui/material';
import { Text } from 'components/display';
import { ExplorerTabs, ExplorerRoutes } from 'types/routes';
import { useI18n } from 'hooks';

export interface BreadcrumbsProps {
  tab: ExplorerTabs;
  route: ExplorerRoutes;
}

export const Breadcrumbs = ({ tab: _tab, route }: BreadcrumbsProps) => {
  const { t } = useI18n();

  const labelKey =
    route === '/' ? 'home' : route.replace('/', '') || (_tab as string);

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
          variant="h6"
          sx={{ color: '#fff' }}
          value={t(`details-${labelKey}`)}
        />
      </Box>
    </Box>
  );
};
