/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { EventResult, EventTypes, EventKinds } from 'types/api';
import { eventTypeMap } from 'cfg/eventTypes';
import { DetailsNumber, DetailsText } from 'components/details';
import { Link } from 'components/display';
import { routes } from 'cfg';
import { Locales } from 'types/locales';

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
  const { echo, echoActiveId } = useEcho();

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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="success"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.string_event?.string_value && (
                    <DetailsText
                      label={echo('value')}
                      value={data?.string_event?.string_value}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'sale_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="success"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.sale_event?.hash && (
                    <DetailsText
                      label={echo('hash')}
                      value={data?.sale_event?.hash}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'organization_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="info"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={4}>
                  {data?.organization_event?.organization?.name && (
                    <DetailsText
                      label={echo('dao-name')}
                      value={data?.organization_event?.organization?.name}
                      linkOptions={{
                        route: '/dao',
                        key: 'dao',
                        title: echo('explore-dao'),
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={6}>
                  {data?.organization_event?.address?.address && (
                    <DetailsText
                      label={echo('address')}
                      value={data?.organization_event?.address?.address}
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
        case 'market_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="info"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2}>
                  {data?.market_event?.base_token?.symbol && (
                    <DetailsText
                      label={echo('base-token')}
                      value={data?.market_event?.base_token?.symbol}
                      linkOptions={{
                        route: '/token',
                        key: 'symbol',
                        title: echo('explore-token'),
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  {data?.market_event?.quote_token?.symbol && (
                    <DetailsText
                      label={echo('infused-token')}
                      value={`${data?.market_event?.quote_token?.symbol}`}
                      linkOptions={{
                        route: '/token',
                        key: 'symbol',
                        title: echo('explore-token'),
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.market_event?.price && (
                      <DetailsNumber
                        label={echo('value')}
                        value={parseInt(data?.market_event?.price, 10)}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.market_event?.end_price && (
                      <DetailsNumber
                        label={echo('value')}
                        value={parseInt(data?.market_event?.end_price, 10)}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        case 'infusion_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="secondary"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={2}>
                  {data?.infusion_event?.base_token?.symbol && (
                    <DetailsText
                      label={echo('base-token')}
                      value={data?.infusion_event?.base_token?.symbol}
                      linkOptions={{
                        route: '/token',
                        key: 'symbol',
                        title: echo('explore-token'),
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  {data?.infusion_event?.base_token?.symbol && (
                    <DetailsText
                      label={echo('infused-token')}
                      value={`${data?.infusion_event?.infused_token?.symbol}`}
                      linkOptions={{
                        route: '/token',
                        key: 'symbol',
                        title: echo('explore-token'),
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.infusion_event?.infused_value && (
                      <DetailsNumber
                        label={echo('value')}
                        value={parseInt(
                          data?.infusion_event?.infused_value,
                          10,
                        )}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          );
        case 'hash_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="info"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.hash_event?.hash && (
                    <DetailsText
                      label={echo('hash')}
                      value={data?.hash_event?.hash}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'gas_event':
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="warning"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={3}>
                  {data?.gas_event?.price && (
                    <DetailsNumber
                      label={echo('price')}
                      value={parseInt(data?.gas_event?.price, 10)}
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.gas_event?.amount && (
                      <DetailsNumber
                        label={echo('amount')}
                        value={parseInt(data?.gas_event?.amount, 10)}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={5}>
                  {data?.gas_event?.address?.address && (
                    <DetailsText
                      label={echo('address')}
                      value={data?.gas_event?.address?.address}
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="info"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="success"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.address_event?.address && (
                    <DetailsText
                      label={echo('address')}
                      value={data?.address_event?.address?.address || ''}
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
                <Grid item md={2}>
                  <Link
                    href={routes['/event'](echoActiveId as Locales, {
                      id: `${data?.event_id}`,
                    })}
                    sx={{ textDecoration: 'none' }}
                  >
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={3}>
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
                <Grid item md={5}>
                  {data?.address && (
                    <DetailsText
                      label={echo('address')}
                      value={data?.address}
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
        default:
          return null;
      }
    }
    return null;
  }, [type, kind, data, echo, echoActiveId]);

  return <Box>{content}</Box>;
};
