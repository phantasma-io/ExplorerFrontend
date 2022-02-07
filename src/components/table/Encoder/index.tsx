import React, { useEffect, ReactChild, ReactChildren } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { TableParams } from '../../../types/table';
import { encode } from '../../../scripts';

export interface TableEncoderProps {
  children?: ReactChild | ReactChildren;
  params: TableParams;
}

export const TableEncoder = ({ children, params }: TableEncoderProps) => {
  const { push, asPath, query } = useRouter();

  useEffect(() => {
    push({
      pathname: asPath,
      query: {
        ...query,
        t: encode(params),
      },
    });
  }, [params, asPath, query, push]);

  return <Box>{children}</Box>;
};
