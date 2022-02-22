import React, { useEffect, ReactChild, ReactChildren } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { TableParams } from '../../../types/table';
import { encode, objToQuery } from '../../../scripts';

export interface TableEncoderProps {
  children?: ReactChild | ReactChildren;
  params: TableParams;
}

export const TableEncoder = ({ children, params }: TableEncoderProps) => {
  const { asPath, query } = useRouter();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { locale, view, ...p } = query;
    const newQuery = { ...p, t: encode(params) };
    const newQueryString = `${asPath.split('?')[0]}${objToQuery(newQuery)}`;
    if (window) {
      window.history.pushState(null, '', newQueryString);
    }
  }, [params, asPath, query]);

  return <Box>{children}</Box>;
};
