/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { EventResult, EventTypes, EventKinds } from 'types/api';
import { eventTypeMap } from 'cfg/eventTypes';
import { DetailsNumber, DetailsText } from 'components/details';
import { Link, Text } from 'components/display';
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

  const rawPayload = useMemo(() => {
    return (
      data?.unknown_event?.payload_json ??
      data?.payload_json ??
      data?.string_event?.string_value ??
      ''
    );
  }, [data]);

  const rawData = useMemo(() => {
    return data?.unknown_event?.raw_data ?? data?.raw_data ?? '';
  }, [data]);

  const renderUnknown = useMemo(() => {
    if (!data || (!rawPayload && !rawData)) return null;

    const formatPayload = (value?: string) => {
      if (!value) return '';
      try {
        return JSON.stringify(JSON.parse(value), null, 2);
      } catch {
        return value;
      }
    };

    const payloadFormatted = formatPayload(rawPayload);
    const rawDataFormatted = rawData && rawData !== rawPayload ? rawData : '';

    return (
      <Box my={1}>
        <Grid container spacing={1} alignItems="center">
          <Grid item md={2}>
            <Link
              href={routes['/event'](echoActiveId as Locales, {
                id: `${data?.event_id}`,
              })}
              sx={{ textDecoration: 'none' }}
            >
              <Button fullWidth color="warning" variant="contained" size="small">
                {data?.event_kind || 'Unknown'}
              </Button>
            </Link>
          </Grid>
          <Grid item md={10}>
            {payloadFormatted && (
              <Text
                label={echo('payload')}
                value={payloadFormatted}
                variant="body2"
                monospace
                wordBreak="break-word"
              />
            )}
            {!payloadFormatted && rawDataFormatted && (
              <Text
                label={echo('raw-data')}
                value={rawDataFormatted}
                variant="body2"
                monospace
                wordBreak="break-word"
              />
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }, [data, echo, echoActiveId, rawData, rawPayload]);

  const content = useMemo(() => {
    if (kind && type) {
      switch (type) {
        case 'transaction_settle_event':
          return null;
        case 'string_event':
          return (
            <Box my={1}>
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
            <Box my={1}>
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
            <Box my={1}>
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
        case 'token_create_event':
          return (
            <Box my={1}>
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
                    <Button fullWidth color="success" variant="contained" size="small">
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.token_create_event?.token?.symbol && (
                    <DetailsText
                      label="token"
                      value={data?.token_create_event?.token?.symbol}
                    />
                  )}
                  {data?.token_create_event?.max_supply && (
                    <DetailsText
                      label="max supply"
                      value={data?.token_create_event?.max_supply}
                    />
                  )}
                  {data?.token_create_event?.decimals && (
                    <DetailsText
                      label="decimals"
                      value={data?.token_create_event?.decimals}
                    />
                  )}
                  {data?.token_create_event?.is_non_fungible !== undefined && (
                    <DetailsText
                      label="non-fungible"
                      value={`${data?.token_create_event?.is_non_fungible}`}
                    />
                  )}
                  {data?.token_create_event?.carbon_token_id && (
                    <DetailsText
                      label="carbon token"
                      value={data?.token_create_event?.carbon_token_id}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'token_series_event':
          return (
            <Box my={1}>
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
                    <Button fullWidth color="success" variant="contained" size="small">
                      {kind}
                    </Button>
                  </Link>
                </Grid>
                <Grid item md={8}>
                  {data?.token_series_event?.series_id && (
                    <DetailsText
                      label="series"
                      value={data?.token_series_event?.series_id}
                    />
                  )}
                  {data?.token_series_event?.token?.symbol && (
                    <DetailsText
                      label="token"
                      value={data?.token_series_event?.token?.symbol}
                    />
                  )}
                  {data?.token_series_event?.owner?.address && (
                    <DetailsText
                      label="owner"
                      value={data?.token_series_event?.owner?.address}
                    />
                  )}
                  {data?.token_series_event?.max_supply && (
                    <DetailsText
                      label="max supply"
                      value={data?.token_series_event?.max_supply}
                    />
                  )}
                  {data?.token_series_event?.max_mint && (
                    <DetailsText
                      label="max mint"
                      value={data?.token_series_event?.max_mint}
                    />
                  )}
                  {data?.token_series_event?.carbon_series_id && (
                    <DetailsText
                      label="carbon series"
                      value={data?.token_series_event?.carbon_series_id}
                    />
                  )}
                  {data?.token_series_event?.carbon_token_id && (
                    <DetailsText
                      label="carbon token"
                      value={data?.token_series_event?.carbon_token_id}
                    />
                  )}
                </Grid>
              </Grid>
            </Box>
          );
        case 'market_event':
          return (
            <Box my={1}>
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
            <Box my={1}>
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
            <Box my={1}>
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
            <Box my={1}>
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
                <Grid item md={2}>
                  {data?.gas_event?.fee && (
                    <DetailsNumber
                      label={echo('fee')}
                      value={parseFloat(data?.gas_event?.fee)}
                      append=" KCAL"
                    />
                  )}
                </Grid>
                <Grid item md={2}>
                  <Box>
                    {data?.gas_event?.amount && (
                      <DetailsNumber
                        label={echo('amount')}
                        value={parseInt(data?.gas_event?.amount, 10)}
                        append=" KCAL"
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item md={6}>
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
            <Box my={1}>
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
            <Box my={1}>
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
                <Grid item md={10}>
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
          if (data?.token_event) {
            return (
              <Box my={1}>
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
                  <Grid item md={2}>
                    <Box>
                      {data?.token_event?.value && (
                        <DetailsNumber
                          label={echo('value')}
                          value={parseFloat(data?.token_event?.value)}
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
                  <Grid item md={6}>
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
          }
          return renderUnknown;
        case 'unknown_event':
          return renderUnknown;
        default:
          return renderUnknown;
      }
    }
    return renderUnknown;
  }, [type, kind, data, echo, echoActiveId, renderUnknown]);

  return <Box>{content}</Box>;
};
