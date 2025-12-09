/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, Typography } from '@mui/material';
import { useEcho } from 'hooks/useEcho';
import { EventResult } from 'types/api';
import { EventType } from '../EventType';

/**
 * EventActivity props
 */
export interface EventActivityProps {
  data?: EventResult[];
}

/**
 * EventActivity
 */
export const EventActivity = ({ data }: EventActivityProps) => {
  const { echo } = useEcho();
  if (data && data.length > 0) {
    return (
      <Box>
        <Box pt={1}>
          <Typography fontWeight={600} variant="body2" gutterBottom>
            {echo('activity')}:
          </Typography>
        </Box>
        <Grid container>
          {data.map((event) => {
            return (
              <Grid item xs={12} key={nanoid()}>
                <EventType data={event} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return null;
};
