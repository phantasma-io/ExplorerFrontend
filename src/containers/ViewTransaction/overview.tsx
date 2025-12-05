import React, { useMemo, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { Box, IconButton, Stack, Tooltip } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useTransactionData } from 'hooks/api';
import { TransactionResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';
import { EventDesc } from 'components/display/EventDesc';
import { endpoints, routes } from 'cfg';
import { useEcho } from 'hooks/useEcho';
import { Locales } from 'types/locales';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Cap how many neighbouring blocks we probe to avoid unbounded requests.
const BLOCK_SCAN_LIMIT = 30;

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
  const blockHeightNum =
    tx?.block_height !== undefined && tx?.block_height !== null
      ? Number(tx.block_height)
      : null;
  const indexNum =
    tx?.index !== undefined && tx?.index !== null ? Number(tx.index) : null;

  const [prevHash, setPrevHash] = React.useState<string | null>(null);
  const [nextHash, setNextHash] = React.useState<string | null>(null);
  const [navLoading, setNavLoading] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const fetchBlockTx = async (
      bh: number,
      offset: number,
      orderDirection: 'asc' | 'desc' = 'asc',
    ) => {
      try {
        const res = await fetch(
          endpoints['/transactions']({
            block_height: bh.toString(),
            order_by: 'id',
            order_direction: orderDirection,
            offset: Math.max(offset, 0),
            limit: 1,
          }),
        );

        if (!res.ok) return null;

        const json: TransactionResults = await res.json();
        return json.transactions?.[0]?.hash || null;
      } catch {
        return null;
      }
    };

    const findPrev = async () => {
      if (
      blockHeightNum === null ||
      Number.isNaN(blockHeightNum) ||
      indexNum === null ||
      Number.isNaN(indexNum) ||
      indexNum < 0 ||
      blockHeightNum < 0
    ) {
      return null;
    }

      if (indexNum > 0) {
        const prevSame = await fetchBlockTx(blockHeightNum, indexNum - 1);
        if (prevSame) return prevSame;
      }

      for (
        let height = blockHeightNum - 1, steps = 0;
        height > 0 && steps < BLOCK_SCAN_LIMIT;
        height--, steps++
      ) {
        const candidate = await fetchBlockTx(height, 0, 'desc');
        if (candidate) return candidate;
      }

      return null;
    };

    const findNext = async () => {
      if (
      blockHeightNum === null ||
      Number.isNaN(blockHeightNum) ||
      indexNum === null ||
      Number.isNaN(indexNum) ||
      indexNum < 0 ||
      blockHeightNum < 0
    ) {
      return null;
    }

      const nextSame = await fetchBlockTx(blockHeightNum, indexNum + 1);
      if (nextSame) return nextSame;

      for (
        let height = blockHeightNum + 1, steps = 0;
        steps < BLOCK_SCAN_LIMIT;
        height++, steps++
      ) {
        const candidate = await fetchBlockTx(height, 0, 'asc');
        if (candidate) return candidate;
      }

      return null;
    };

    if (
      blockHeightNum === null ||
      Number.isNaN(blockHeightNum) ||
      indexNum === null ||
      indexNum === undefined ||
      Number.isNaN(indexNum) ||
      indexNum < 0 ||
      blockHeightNum < 0
    ) {
      setPrevHash(null);
      setNextHash(null);
      setNavLoading(false);
      return;
    }

    setNavLoading(true);

    (async () => {
      const [prev, next] = await Promise.all([findPrev(), findNext()]);

      if (!cancelled) {
        setPrevHash(prev);
        setNextHash(next);
        setNavLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [blockHeightNum, indexNum]);

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
                      disabled={!prevHash || navLoading}
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
                      disabled={!nextHash || navLoading}
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
    navLoading,
    handleNavigate,
  ]);

  return <Box p={1}>{content}</Box>;
};
