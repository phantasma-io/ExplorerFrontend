import React, { useMemo, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useTransactionData } from 'hooks/api';
import { TransactionResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';
import { EventDesc } from 'components/display/EventDesc';
import { routes } from 'cfg';
import { useEcho } from 'hooks/useEcho';
import { Locales } from 'types/locales';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface TransactionOverviewProps {
  data?: TransactionResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TransactionOverview = ({
  data,
  loading,
  error,
}: TransactionOverviewProps) => {
  const { echoActiveId } = useEcho();
  const router = useRouter();

  const tx = data?.transactions?.[0];
  const prevHash = tx?.previous_hash ?? null;
  const nextHash = tx?.next_hash ?? null;

  const handleNavigate = useCallback(
    (hash?: string | null) => {
      if (!hash) return;
      router.push({
        pathname: routes['/transaction'](echoActiveId as Locales),
        query: { id: hash },
      });
    },
    [echoActiveId, router],
  );

  const renderOverview = useRenderOverview();

  const { cols, rows, raw } = useTransactionData(data);

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (error || data?.error) {
      return <Error />;
    }

    if (rows.length === 0 && !loading) {
      return <Empty />;
    }

    return (
      <Overview
        csvFilename={`PhantasmaExplorer-Transaction-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>
          {data &&
            renderOverview(
              cols,
              rows,
              data,
              <Stack direction="row" spacing={0.5}>
                <Tooltip title="Previous transaction">
                  <span>
                    <IconButton
                      color="primary"
                      size="small"
                      disabled={!prevHash}
                      onClick={() => handleNavigate(prevHash)}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Next transaction">
                  <span>
                    <IconButton
                      color="primary"
                      size="small"
                      disabled={!nextHash}
                      onClick={() => handleNavigate(nextHash)}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Stack>,
            )}
        </Box>
        <Box>
          <EventDesc data={raw[0].events} />
        </Box>
      </Overview>
    );
  }, [
    loading,
    error,
    rows,
    data,
    renderOverview,
    cols,
    raw,
    prevHash,
    nextHash,
    handleNavigate,
  ]);

  return <Box p={1}>{content}</Box>;
};
