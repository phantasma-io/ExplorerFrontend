/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { EventResult } from 'types/api';
import { useI18n } from 'hooks';
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
  const { t } = useI18n();
  if (data && data.length > 0) {
    return (
      <Box>
        <Box pt={1}>
          <Typography fontWeight={600} variant="body2" gutterBottom>
            {t('activity')}:
          </Typography>
        </Box>
        <Grid container>
          {data.map((event, index) => {
            return (
              <Grid
                item
                xs={12}
                key={event.event_id ?? `${event.transaction_hash}-${event.event_kind}-${index}`}
              >
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
