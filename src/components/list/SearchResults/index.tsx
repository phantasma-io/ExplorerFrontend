import React, { useMemo, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApi, useI18n } from 'hooks';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { ExplorerRoutes } from 'types/routes';
import { SearchResultsType, SearchParams } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { Link } from 'components/display';

interface SingleResult {
  single: boolean;
  type: string;
}

type SearchMap = {
  [endpoint: string]: { found: boolean; value: string };
};

export const SearchResults = () => {
  const { query, push } = useRouter();

  const { locale, t } = useI18n();

  const { data, loading, error } = useApi<SearchResultsType>(
    endpoints['/searches']({
      value: query.id,
    } as SearchParams),
  );

  const { isEmpty, isSingle, byType } = useMemo(() => {
    const result = data?.result || [];
    const foundItems = result.filter((item) => item.found);

    const map: SearchMap = {};
    foundItems.forEach((item) => {
      map[item.endpoint_name] = { found: item.found, value: query.id as string };
    });

    return {
      isEmpty: foundItems.length === 0,
      isSingle: {
        single: foundItems.length === 1,
        type: foundItems[0]?.endpoint_name || '',
      } as SingleResult,
      byType: map,
    };
  }, [data?.result, query.id]);

  const switchType = useCallback((type: string) => {
    switch (type) {
      case 'tokens':
        return '/token';
      case 'platforms':
        return '/platform';
      case 'organizations':
        return '/dao';
      case 'contracts':
        return '/contract';
      // case 'chains':
      //   return '/chain'
      case 'blocks':
        return '/block';
      case 'transactions':
        return '/transaction';
      case 'addresses':
      default:
        return '/address';
    }
  }, []);

  useEffect(() => {
    if (isSingle.single) {
      const route = switchType(isSingle.type) as ExplorerRoutes;
      push({
        pathname: routes[route](locale as Locales),
        query,
      });
    }
  }, [isSingle, switchType, push, query, locale]);

  return (
    <Paper>
      <Box p={2} minHeight="210px">
        <>
          <Box pb={1.5}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Typography variant="h6">{t('search-param')}:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">{query.id}</Typography>
              </Grid>
            </Grid>
          </Box>
          {isEmpty && <Empty />}
          {error && <Error />}
          {loading && <Loading />}
          {data && data.result && (
            <Box pt={2.4}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom>
                    {t('search-results')}:
                  </Typography>
                </Grid>
                {byType.addresses?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/address'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('address')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.blocks?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/block'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('block')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.contracts?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/contract'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('contract')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.platforms?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/platform'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('platform')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.organizations?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/dao'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('dao')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.tokens?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/token'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('token')})
                      </Button>
                    </Link>
                  </Grid>
                )}
                {byType.transactions?.found && (
                  <Grid item xs={12}>
                    <Link
                      href={routes['/transaction'](locale as Locales, {
                        id: query.id as string,
                      })}
                    >
                      <Button>
                        {query.id} ({t('transaction')})
                      </Button>
                    </Link>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </>
      </Box>
    </Paper>
  );
};
