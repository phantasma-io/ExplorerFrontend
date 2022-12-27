/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { nanoid } from 'nanoid';
import { Box, Grid, Typography } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { EventResult } from 'types/api';
import { EventLine } from './line';

/**
 * EventDesc props
 */
export interface EventDescProps {
  data?: EventResult[];
}

/**
 * EventDesc
 */
export const EventDesc = ({ data }: EventDescProps) => {
  const { echo } = useEcho();
  if (data && data.length > 0) {
    return (
      <Box>
        <Box pt={1}>
          <Typography fontWeight={600} variant="body2" gutterBottom>
            {echo('desc')}:
          </Typography>
        </Box>
        <Grid container>
          {data.map((event) => {
            return (
              <Grid item xs={12} key={nanoid()}>
                <EventLine data={event} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return null;
};
