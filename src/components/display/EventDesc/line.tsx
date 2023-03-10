/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useEcho } from '@ricardojrmcom/echo';
import { EventResult, EventTypes, EventKinds } from 'types/api';
import { eventTypeMap } from 'cfg/eventTypes';
import { Link } from 'components/display';
import { routes } from 'cfg';
import { Locales } from 'types/locales';

type Kind = EventKinds | undefined;
type Type = EventTypes | undefined | null;

/**
 * EventLine props
 */
export interface EventLineProps {
  data?: EventResult;
}

/**
 * EventLine
 */
export const EventLine = ({ data }: EventLineProps) => {
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
          switch (kind) {
            // case 'GasEscrow':
            //   return (
            //     <Typography gutterBottom>
            //       <Link
            //         href={routes['/address'](echoActiveId as Locales, {
            //           id: `${data?.address}`,
            //         })}
            //         sx={{ display: 'inline-block' }}
            //       >
            //         {data?.address_name || data?.address}
            //       </Link>{' '}
            //       {echo('desc-escrowed')}{' '}
            //       <Link
            //         href={routes['/token'](echoActiveId as Locales, {
            //           id: `SOUL`,
            //         })}
            //         sx={{ display: 'inline-block' }}
            //       >{`${data?.gas_event?.fee} SOUL`}</Link>
            //     </Typography>
            //   );
            case 'GasPayment':
              return (
                <Typography gutterBottom>
                  <Link
                    href={routes['/address'](echoActiveId as Locales, {
                      id: `${data?.address}`,
                    })}
                    sx={{ display: 'inline-block' }}
                  >
                    {data?.address_name || data?.address}
                  </Link>{' '}
                  {echo('desc-paid')}{' '}
                  <Link
                    href={routes['/token'](echoActiveId as Locales, {
                      id: `KCAL`,
                    })}
                    sx={{ display: 'inline-block' }}
                  >{`${data?.gas_event?.fee} KCAL`}</Link>
                </Typography>
              );
            default:
              return null;
          }
        case 'chain_event':
          return null;
        case 'address_event':
          return null;
        case 'token_event':
          switch (kind) {
            case 'TokenCreate':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-created')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-created')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenMint':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-minted')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-minted')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenBurn':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-burned')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-burned')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenClaim':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-claimed')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-claimed')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenReceive':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-received')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-received')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenSend':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-sent')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-sent')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            case 'TokenStake':
              if (data?.token_event) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-staked')}{' '}
                    <Link
                      href={routes['/token'](echoActiveId as Locales, {
                        id: `${data?.token_event?.token?.symbol}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_event?.value} ${data?.token_event?.token?.symbol}`}</Link>
                  </Typography>
                );
              }
              if (data?.nft_metadata) {
                return (
                  <Typography gutterBottom>
                    <Link
                      href={routes['/address'](echoActiveId as Locales, {
                        id: `${data?.address}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >
                      {data?.address_name || data?.address}
                    </Link>{' '}
                    {echo('desc-staked')}{' '}
                    <Link
                      href={routes['/nft'](echoActiveId as Locales, {
                        id: `${data?.token_id}`,
                      })}
                      sx={{ display: 'inline-block' }}
                    >{`${data?.token_id}`}</Link>
                  </Typography>
                );
              }
              return null;
            default:
              return null;
          }
        default:
          return null;
      }
    }
    return null;
  }, [type, kind, data, echo, echoActiveId]);

  return <Box>{content}</Box>;
};
