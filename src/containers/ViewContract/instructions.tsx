/* eslint-disable react/destructuring-assignment */
import React, { useMemo, useEffect } from 'react';
import { Box } from '@mui/material';
import { ContractResults } from 'types/api';
import { Loading, Error, Empty } from 'components/layout';
import { DetailsScript } from 'components/details';
import { Instructions } from 'components/display';
import { usePost } from 'hooks';
import { endpoints } from 'cfg';
import { ExplorerEndpoints } from 'types/endpoints';

export interface ContractInstructionsProps {
  data?: ContractResults;
  loading?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  scr?: string;
}

export const ContractInstructions = (props: ContractInstructionsProps) => {
  const scrRaw: string = useMemo(() => props.scr || '', [props]);

  const { request, data, loading, error } = usePost(
    endpoints['/instructions']() as ExplorerEndpoints,
    {
      script_raw: scrRaw,
    },
  );

  useEffect(() => {
    if (
      props?.data?.contracts?.length !== 0 &&
      props?.data?.contracts &&
      props?.data?.contracts[0]?.script_raw &&
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

    if (props?.data?.contracts?.length === 0 && !props?.loading) {
      return <Empty />;
    }

    if (data && data?.instructions) {
      return (
        <Box>
          <Instructions data={data} />
        </Box>
      );
    }

    return null;
  }, [props, data, error, loading]);

  return <Box p={1}>{content}</Box>;
};
