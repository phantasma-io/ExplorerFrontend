import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { Box } from '@mui/material';
import { useRenderOverview } from 'hooks/useRenderOverview';
import { useEcho } from 'hooks/useEcho';
import { useNftData } from 'hooks/api';
import { NftResults } from 'types/api';
import { Loading, Error, Empty, Overview } from 'components/layout';
import { MetadataBlock } from 'components/display';

export interface NftOverviewProps {
  data?: NftResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const NftOverview = ({ data, loading, error }: NftOverviewProps) => {
  const renderOverview = useRenderOverview();
  const { echo } = useEcho();

  const { cols, rows, raw } = useNftData(data);
  const nftMetadata = data?.nfts?.[0]?.nft_metadata?.metadata;
  const seriesMetadata = data?.nfts?.[0]?.series?.metadata;

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
        csvFilename={`PhantasmaExplorer-NFT-${nanoid()}.csv`}
        raw={raw[0]}
      >
        <Box>{data && renderOverview(cols, rows)}</Box>
        <MetadataBlock title={echo('metadata-nft')} metadata={nftMetadata} />
        <MetadataBlock
          title={echo('metadata-series')}
          metadata={seriesMetadata}
        />
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
    echo,
    nftMetadata,
    seriesMetadata,
  ]);

  return <Box p={1}>{content}</Box>;
};
