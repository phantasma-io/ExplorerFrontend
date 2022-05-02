import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { encode, objToQuery } from 'scripts';
import { TableUrlParams } from 'types/table';

export interface TableEncoderProps {
  children?: ReactNode;
  params: TableUrlParams;
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
