import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useEcho } from '@ricardojrmcom/echo';
import { useEmpathy } from '@ricardojrmcom/empathy';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import { endpoints, routes } from 'cfg';
import { Locales } from 'types/locales';
import { SearchResultsType, SearchParams } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { Link } from 'components/display';

export const SearchResults = () => {
  const { query } = useRouter();

  const { echoActiveId } = useEcho();

  const { data, loading, error } = useEmpathy<SearchResultsType>(
    endpoints['/searches']({
      value: query.id,
    } as SearchParams),
  );

  const isEmpty = useMemo(() => {
    if (data && data.result) {
      let empty = true;
      data.result.forEach((item) => {
        if (item.found) {
          empty = false;
        }
      });
      return empty;
    }
    return false;
  }, [data]);

  return (
    <Paper>
      <Box p={2} minHeight="210px">
        <Box pb={1.5}>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h6">((SEARCH PARAM)):</Typography>
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
              {data && data.result[0].found && (
                <Grid item xs={12}>
                  <Link
                    href={routes['/address'](echoActiveId as Locales, {
                      id: query.id as string,
                    })}
                  >
                    <Button>((EXPLORE ADDRESS))</Button>
                  </Link>
                </Grid>
              )}
              {data && data.result[1].found && (
                <Grid item xs={12}>
                  <Link
                    href={routes['/block'](echoActiveId as Locales, {
                      id: query.id as string,
                    })}
                  >
                    <Button>((EXPLORE BLOCK))</Button>
                  </Link>
                </Grid>
              )}
              {/* {data && data.result[2].found && (
                <Grid item xs={12}>
                  <Button>((EXPLORE CHAIN))</Button>
                </Grid>
              )} */}
              {/* {data && data.result[3].found && (
                <Grid item xs={12}>
                  <Button>((EXPLORE CONTRACT))</Button>
                </Grid>
              )}
              {data && data.result[4].found && (
                <Grid item xs={12}>
                  <Button>((EXPLORE DAO))</Button>
                </Grid>
              )}
              {data && data.result[5].found && (
                <Grid item xs={12}>
                  <Button>((EXPLORE PLATFORM))</Button>
                </Grid>
              )} */}
              {data && data.result[6].found && (
                <Grid item xs={12}>
                  <Link
                    href={routes['/token'](echoActiveId as Locales, {
                      id: query.id as string,
                    })}
                  >
                    <Button>((EXPLORE TOKEN))</Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
};
