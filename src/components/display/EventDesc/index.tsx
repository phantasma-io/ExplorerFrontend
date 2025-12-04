/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { EventResult } from 'types/api';
import { useI18n } from 'hooks';
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
  const { t } = useI18n();

  const orderEvents = (events: EventResult[]) => {
    const priority = (evt: EventResult) => {
      switch (evt.event_kind) {
        case 'TokenCreate':
        case 'TokenSeriesCreate':
        case 'ContractDeploy':
        case 'PlatformCreate':
        case 'OrganizationCreate':
        case 'Crowdsale':
        case 'ChainCreate':
          return 0;
        case 'TokenMint':
        case 'TokenSend':
        case 'TokenReceive':
        case 'TokenBurn':
        case 'TokenStake':
        case 'TokenClaim':
        case 'Infusion':
        case 'OrderCreated':
        case 'OrderFilled':
        case 'OrderCancelled':
        case 'OrderClosed':
        case 'OrderBid':
        case 'ChainSwap':
        case 'ValueCreate':
        case 'ValueUpdate':
        case 'ValidatorElect':
        case 'ValidatorPropose':
        case 'ValidatorSwitch':
        case 'OrganizationAdd':
        case 'OrganizationRemove':
          return 1;
        case 'GasEscrow':
        case 'GasPayment':
          return 3;
        default:
          return 2;
      }
    };

    const nonGas = events.filter(
      (e) => e.event_kind !== 'GasEscrow' && e.event_kind !== 'GasPayment',
    );
    const base = nonGas.length > 0 ? nonGas : events;

    return [...base].sort((a, b) => priority(a) - priority(b));
  };

  if (data && data.length > 0) {
    const ordered = orderEvents(data);
    return (
      <Box>
        <Box pt={1}>
          <Typography fontWeight={600} variant="body2" gutterBottom>
            {t('desc')}:
          </Typography>
        </Box>
        <Grid container>
          {ordered.map((event, index) => {
            return (
              <Grid
                item
                xs={12}
                key={event.event_id ?? `${event.transaction_hash}-${event.event_kind}-${index}`}
              >
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
