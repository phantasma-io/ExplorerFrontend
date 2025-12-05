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

  const rawPayload = useMemo(() => {
    return data?.unknown_event?.payload_json ?? data?.payload_json ?? '';
  }, [data]);

  const rawData = useMemo(() => {
    return data?.unknown_event?.raw_data ?? data?.raw_data ?? '';
  }, [data]);

  const fallbackLine = useMemo(() => {
    const snippetSource = rawPayload || rawData || '';
    const snippet =
      snippetSource.length > 120
        ? `${snippetSource.slice(0, 120)}…`
        : snippetSource;

    return (
      <Typography gutterBottom>
        {kind || 'Unknown'}{' '}
        {snippet && (
          <Typography component="span" variant="body2">
            {snippet}
          </Typography>
        )}
      </Typography>
    );
  }, [kind, rawData, rawPayload]);

  const content = useMemo(() => {
    if (kind && type) {
      switch (type) {
        case 'transaction_settle_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.transaction_settle_event?.hash && (
                <Typography component="span" variant="body2">
                  {data?.transaction_settle_event?.hash}
                </Typography>
              )}{' '}
              {data?.transaction_settle_event?.platform?.name && (
                <Typography component="span" variant="body2">
                  on {data?.transaction_settle_event?.platform?.name}
                </Typography>
              )}
              {data?.transaction_settle_event?.chain && (
                <Typography component="span" variant="body2">
                  {' '}
                  ({data?.transaction_settle_event?.chain})
                </Typography>
              )}
            </Typography>
          );
        case 'string_event': {
          const subject = data?.address_name || data?.address;
          const label =
            kind === 'PlatformCreate'
              ? 'created platform'
              : kind === 'ContractDeploy'
              ? 'deployed contract'
              : kind === 'OrganizationCreate'
              ? 'created organization'
              : kind === 'ChainCreate'
              ? 'created chain'
              : 'value';

          return (
            <Typography gutterBottom>
              {subject && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, { id: `${data?.address}` })}
                  sx={{ display: 'inline-block' }}
                >
                  {subject}
                </Link>
              )}{' '}
              <Typography component="span" variant="body2">
                {label}
              </Typography>
              {data?.string_event?.string_value && (
                <Typography component="span" variant="body2">
                  {' '}
                  {data?.string_event?.string_value}
                </Typography>
              )}
            </Typography>
          );
        }
        case 'sale_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              <Typography component="span" variant="body2">
                {data?.sale_event?.sale_event_kind || ''}
              </Typography>
              {data?.sale_event?.hash && (
                <Typography component="span" variant="body2">
                  {' '}
                  {data?.sale_event?.hash}
                </Typography>
              )}
            </Typography>
          );
        case 'organization_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.organization_event?.organization?.name && (
                <Typography component="span" variant="body2">
                  {data?.organization_event?.organization?.name}
                </Typography>
              )}{' '}
              {data?.organization_event?.address?.address && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, {
                    id: `${data?.organization_event?.address?.address}`,
                  })}
                  sx={{ display: 'inline-block' }}
                >
                  {data?.organization_event?.address?.address}
                </Link>
              )}
            </Typography>
          );
        case 'market_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.market_event?.market_event_kind && (
                <Typography component="span" variant="body2">
                  {data?.market_event?.market_event_kind}{' '}
                </Typography>
              )}
              {(data?.market_event?.base_token?.symbol ||
                data?.market_event?.quote_token?.symbol) && (
                <Typography component="span" variant="body2">
                  {data?.market_event?.base_token?.symbol || ''}/
                  {data?.market_event?.quote_token?.symbol || ''}
                </Typography>
              )}{' '}
              {data?.market_event?.price && (
                <Typography component="span" variant="body2">
                  {data?.market_event?.price}
                  {data?.market_event?.quote_token?.symbol
                    ? ` ${data?.market_event?.quote_token?.symbol}`
                    : ''}
                </Typography>
              )}
            </Typography>
          );
        case 'infusion_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.infusion_event?.infused_value && (
                <Typography component="span" variant="body2">
                  {data?.infusion_event?.infused_value}{' '}
                  {data?.infusion_event?.infused_token?.symbol}
                </Typography>
              )}{' '}
              {data?.infusion_event?.base_token?.symbol && (
                <Typography component="span" variant="body2">
                  into {data?.infusion_event?.base_token?.symbol}
                </Typography>
              )}
              {data?.infusion_event?.token_id && (
                <Typography component="span" variant="body2">
                  {' '}
                  (#{data?.infusion_event?.token_id})
                </Typography>
              )}
            </Typography>
          );
        case 'hash_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              <Typography component="span" variant="body2">
                {data?.hash_event?.hash}
              </Typography>
            </Typography>
          );
        case 'gas_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.gas_event?.address?.address && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, {
                    id: `${data?.gas_event?.address?.address}`,
                  })}
                  sx={{ display: 'inline-block' }}
                >
                  {data?.gas_event?.address?.address}
                </Link>
              )}
              {data?.gas_event?.address?.address ? ' ' : null}
              {data?.gas_event?.fee && (
                <Typography component="span" variant="body2">
                  paid {data?.gas_event?.fee} KCAL
                </Typography>
              )}
              {!data?.gas_event?.fee && data?.gas_event?.amount && (
                <Typography component="span" variant="body2">
                  paid {data?.gas_event?.amount} KCAL
                </Typography>
              )}
            </Typography>
          );
        case 'governance_gas_config_event': {
          const cfg = data?.governance_gas_config_event;
          const summaryParts = [];
          if (cfg?.fee_multiplier) summaryParts.push(`multiplier ${cfg.fee_multiplier}`);
          if (cfg?.gas_fee_transfer) summaryParts.push(`transfer ${cfg.gas_fee_transfer}`);
          if (cfg?.gas_fee_query) summaryParts.push(`query ${cfg.gas_fee_query}`);
          if (cfg?.gas_fee_per_byte) summaryParts.push(`per byte ${cfg.gas_fee_per_byte}`);
          if (cfg?.minimum_gas_offer) summaryParts.push(`min offer ${cfg.minimum_gas_offer}`);

          if (summaryParts.length === 0 && cfg?.version) summaryParts.push(`version ${cfg.version}`);
          if (summaryParts.length === 0) return fallbackLine;

          const prefix = 'Gas config updated:';

          return (
            <Typography gutterBottom>
              {prefix}{' '}
              <Typography component="span" variant="inherit">
                {summaryParts.join(', ')}
              </Typography>
            </Typography>
          );
        }
        case 'governance_chain_config_event': {
          const cfg = data?.governance_chain_config_event;
          const summaryParts = [];
          if (cfg?.allowed_tx_types) summaryParts.push(`allowed ${cfg.allowed_tx_types}`);
          if (cfg?.expiry_window) summaryParts.push(`expiry window ${cfg.expiry_window}`);
          if (cfg?.block_rate_target) summaryParts.push(`block rate target ${cfg.block_rate_target}`);
          if (summaryParts.length === 0 && cfg?.version) summaryParts.push(`version ${cfg.version}`);
          if (summaryParts.length === 0) return fallbackLine;

          const prefix = 'Chain config updated:';

          return (
            <Typography gutterBottom>
              {prefix}{' '}
              <Typography component="span" variant="inherit">
                {summaryParts.join(', ')}
              </Typography>
            </Typography>
          );
        }
        case 'chain_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.chain_event?.name && (
                <Typography component="span" variant="body2">
                  {data?.chain_event?.name}
                </Typography>
              )}{' '}
              {data?.chain_event?.value && (
                <Typography component="span" variant="body2">
                  {data?.chain_event?.value}
                </Typography>
              )}{' '}
              {data?.chain_event?.chain?.chain_name && (
                <Typography component="span" variant="body2">
                  ({data?.chain_event?.chain?.chain_name})
                </Typography>
              )}
            </Typography>
          );
        case 'address_event':
          return (
            <Typography gutterBottom>
              {kind}:{' '}
              {data?.address_event?.address?.address && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, {
                    id: `${data?.address_event?.address?.address}`,
                  })}
                  sx={{ display: 'inline-block' }}
                >
                  {data?.address_event?.address?.address}
                </Link>
              )}
            </Typography>
          );
        case 'token_create_event': {
          const tokenSymbol = data?.token_create_event?.token?.symbol;
          if (!tokenSymbol) return fallbackLine;
          const token = data?.token_create_event?.token;
          const ownerAddress = data?.address;
          const ownerLabel = data?.address_name || ownerAddress;
          const limits = [];
          if (data?.token_create_event?.max_supply) limits.push(`max supply ${data.token_create_event.max_supply}`);
          if (data?.token_create_event?.decimals) limits.push(`${data.token_create_event.decimals} decimals`);
          const fungibilityLabel =
            data?.token_create_event?.is_non_fungible === true ? 'NFT token' : 'fungible token';

          return (
            <Typography gutterBottom>
              {ownerAddress && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, { id: `${ownerAddress}` })}
                  sx={{ display: 'inline-block' }}
                >
                  {ownerLabel}
                </Link>
              )}{' '}
              <Typography component="span" variant="inherit">
                created {fungibilityLabel}
              </Typography>{' '}
              {token?.symbol ? (
                <Link
                  href={routes['/token'](echoActiveId as Locales, { id: `${token?.symbol}` })}
                  sx={{ display: 'inline-block' }}
                >
                  {token?.symbol}
                </Link>
              ) : (
                token?.name ?? token?.symbol ?? null
              )}
              {limits.length > 0 && (
                <Typography component="span" variant="inherit">
                  {' '}
                  ({limits.join(', ')})
                </Typography>
              )}
            </Typography>
          );
        }
        case 'token_series_event': {
          const series = data?.token_series_event;
          const ownerAddress = series?.owner?.address || data?.address;
          const ownerLabel = series?.owner?.address_name || data?.address_name || ownerAddress;
          const tokenSymbol = series?.token?.symbol || data?.contract?.symbol;
          const seriesId = series?.series_id || data?.token_id;
          const limits = [];
          if (series?.max_supply) limits.push(`max supply ${series.max_supply}`);
          if (series?.max_mint) limits.push(`max mint ${series.max_mint}`);

          return (
            <Typography gutterBottom>
              {ownerAddress && (
                <Link
                  href={routes['/address'](echoActiveId as Locales, { id: `${ownerAddress}` })}
                  sx={{ display: 'inline-block' }}
                >
                  {ownerLabel}
                </Link>
              )}{' '}
              <Typography component="span" variant="inherit">
                created series
              </Typography>{' '}
              {seriesId && (
                <Typography component="span" variant="inherit">
                  #{seriesId}
                </Typography>
              )}
              {tokenSymbol && (
                <>
                  {' '}
                  <Typography component="span" variant="inherit">
                    for
                  </Typography>{' '}
                  <Link
                    href={routes['/token'](echoActiveId as Locales, { id: `${tokenSymbol}` })}
                    sx={{ display: 'inline-block' }}
                  >
                    {tokenSymbol}
                  </Link>
                </>
              )}
              {limits.length > 0 && (
                <Typography component="span" variant="inherit">
                  {' '}
                  ({limits.join(', ')})
                </Typography>
              )}
            </Typography>
          );
        }
        case 'token_event':
          switch (kind) {
            case 'TokenCreate':
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
                  created token{' '}
                  <Link
                    href={routes['/token'](echoActiveId as Locales, {
                      id: `${data?.token_event?.token?.symbol || data?.token_id}`,
                    })}
                    sx={{ display: 'inline-block' }}
                  >
                    {data?.token_event?.token?.symbol || data?.token_id || ''}
                  </Link>
                </Typography>
              );
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
          return fallbackLine;
      }
    }
    return fallbackLine;
  }, [type, kind, data, echo, echoActiveId, fallbackLine]);

  return <Box>{content}</Box>;
};
