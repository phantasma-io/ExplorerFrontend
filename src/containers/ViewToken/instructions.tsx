/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { TokenResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';
import { usePost } from 'hooks';
import { endpoints } from 'cfg';
import { ExplorerEndpoints } from 'types/endpoints';

export interface TokenInstructionsProps {
  data?: TokenResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

export const TokenInstructions = (props: TokenInstructionsProps) => {
  const { request, data, loading, error } = usePost(
    endpoints['/instructions']() as ExplorerEndpoints,
    {
      script_raw: '0B',
    },
  );

  useEffect(() => {
    if (
      props?.data?.tokens?.length !== 0 &&
      props?.data?.tokens &&
      props?.data?.tokens[0]?.script_raw &&
      !error &&
      !data
    ) {
      request();
    }
  }, [props, request, error, data]);

  const content = useMemo(() => {
    if (props?.loading || loading) {
      return <Loading />;
    }

    if (props?.error || props?.data?.error || error) {
      return <Error />;
    }

    if (props?.data?.tokens?.length === 0 && !props?.loading) {
      return <Empty />;
    }

    if (data && data?.instructions) {
      let str = ``;

      data?.instructions?.forEach((item: { instruction?: string }) => {
        str += `
        
          ${item?.instruction}

        `;
      });

      return (
        <Box>
          <DetailsScript value={str} />
        </Box>
      );
    }

    return null;
  }, [props, data, error, loading]);

  return <Box p={1}>{content}</Box>;
};
