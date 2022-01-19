import React from 'react';
import { Box } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Text } from '../../components';

interface ViewPageProps {
  children?: React.ReactNode;
  title: string;
}

export const ViewPage = ({ children, title }: ViewPageProps) => {
  const { echo } = useEcho();
  return (
    <Box>
      <Box pt={{ xs: 3, lg: 9 }}>
        <Text variant="h2" sx={{ color: '#fff' }}>
          {echo(title)}
        </Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
