import React from 'react';
import { Box, Paper } from '@mui/material';
import { useEcho } from '@ricardo-jrm/echo';
import { Text } from '../Text';

/**
 * NotFound props
 */
export interface NotFoundProps {
  kind: string;
}

/**
 * NotFound
 */
export const NotFound = ({ kind }: NotFoundProps) => {
  const { echo } = useEcho();
  return (
    <Paper>
      <Box px={{ xs: 1, md: 3 }} py={9}>
        <Text variant="h3" gutterBottom>
          404:
        </Text>
        <Text variant="h4">{`${echo(kind)} ${echo('not-found')}`}</Text>
      </Box>
    </Paper>
  );
};
