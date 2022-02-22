import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { TABLE_PAGE, TABLE_SIZE } from '../cfg';
import { decode } from '../scripts';

export const usePageParams = () => {
  const { query } = useRouter();

  const params = useMemo(() => {
    if (query.t) {
      const decoded = decode(query.t as string);
      return {
        pageParam: decoded.page || TABLE_PAGE,
        pageSizeParam: decoded.pageSize || TABLE_SIZE,
      };
    }

    return {
      pageParam: TABLE_PAGE,
      pageSizeParam: TABLE_SIZE,
    };
  }, [query]);

  return params;
};
