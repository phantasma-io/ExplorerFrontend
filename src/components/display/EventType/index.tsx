/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Box, Grid, Chip } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { EventResult, EventTypes, EventKinds } from 'types/api';
import { eventTypeMap } from 'cfg/eventTypes';
import { DetailsNumber, DetailsText } from 'components/details';

type Kind = EventKinds | undefined;
type Type = EventTypes | undefined | null;

/**
 * EventType props
 */
export interface EventTypeProps {
  data?: EventResult;
}

/**
 * EventType
 */
export const EventType = ({ data }: EventTypeProps) => {
  const { echo } = useEcho();

  const kind: Kind = useMemo(() => {
    if (data) {
      return data.event_kind as EventKinds;
    }
    return undefined;
  }, [data]);

  const type: Type = useMemo(() => {
    if (kind) {
      return eventTypeMap[kind];
    }
    return undefined;
  }, [kind]);

  const content = useMemo(() => {
    if (kind && type) {
      switch (type) {
        case 'transaction_settle_event':
          return null;
        case 'string_event':
          return null;
        case 'sale_event':
          return null;
        case 'organization_event':
          return null;
        case 'market_event':
          return null;
        case 'infusion_event':
          return null;
        case 'hash_event':
          return null;
        case 'gas_event':
          return null;
        case 'chain_event':
          return (
            <Box>
              <Grid
                container
                spacing={1}
                justifyContent="flex-start"
                justifyItems="flex-start"
                alignContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Chip label={kind} color="info" />
                </Grid>
                <Grid item md={2}>
                  {data?.chain_event?.name && (
                    <DetailsText
                      label={echo('name')}
                      value={data?.chain_event?.name}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.chain_event?.value && (
                      <DetailsNumber
                        label={echo('value')}
                        value={parseInt(data?.chain_event?.value, 10)}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={2}>
                  {data?.chain_event?.chain?.chain_name && (
                    <DetailsText
                      label={echo('chain')}
                      value={data?.chain_event?.chain?.chain_name}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.chain_event?.chain?.chain_height && (
                      <DetailsNumber
                        label={echo('height')}
                        value={parseInt(
                          data?.chain_event?.chain?.chain_height,
                          10,
                        )}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        case 'address_event':
          return (
            <Box>
              <Grid
                container
                spacing={1}
                justifyContent="flex-start"
                justifyItems="flex-start"
                alignContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Chip label={kind} />
                </Grid>
                <Grid item md={8}>
                  {data?.address_event?.address && (
                    <DetailsText
                      label={echo('address')}
                      value={data?.address_event?.address}
                      linkOptions={{
                        route: '/address',
                        key: 'address',
                        title: echo('explore-address'),
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'token_event':
          return (
            <Box>
              <Grid
                container
                spacing={1}
                justifyContent="flex-start"
                justifyItems="flex-start"
                alignContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Chip label={kind} color="primary" />
                </Grid>
                <Grid item md={2}>
                  {data?.token_event?.chain_name && (
                    <DetailsText
                      label={echo('chain')}
                      value={data?.token_event?.chain_name}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.token_event?.value && (
                      <DetailsNumber
                        label={echo('value')}
                        value={parseInt(data?.token_event?.value, 10)}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={2}>
                  {data?.token_event?.token?.symbol && (
                    <DetailsText
                      label={echo('token')}
                      value={data?.token_event?.token?.symbol}
                      linkOptions={{
                        route: '/token',
                        key: 'symbol',
                        title: echo('explore-token'),
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        default:
          return null;
      }
    }
    return null;
  }, [type, kind, data, echo]);

  console.log({ data, kind, type });

  return <Box>{content}</Box>;
};
