import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TABLE_PAGE,
  TABLE_SIZE,
  TABLE_ORDERBY,
  TABLE_ORDERDIR,
  TABLE_TOTAL,
} from 'cfg';
import { decode, queryToObj } from 'scripts';
import { TableUrlParams, TableOrderDirection } from 'types/table';

export const useTableParams = () => {
  const { asPath } = useRouter();
  const [search, searchSet] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      searchSet(window.location.search);
    }
  }, [asPath]);

  const params = useMemo<TableUrlParams>(() => {
    let hasInitialParams = false;
    if (search) {
      const obj = queryToObj(search);
      if (obj.t) {
        hasInitialParams = true;
        const decoded = decode(obj.t as string);
        return {
          total: (decoded.total as number) || TABLE_TOTAL,
          page: (decoded.page as number) || TABLE_PAGE,
          pageSize: (decoded.pageSize as number) || TABLE_SIZE,
          orderBy: (decoded.orderBy as string) || TABLE_ORDERBY,
          orderDirection:
            (decoded.orderDirection as TableOrderDirection) || TABLE_ORDERDIR,
          hasInitialParams,
        };
      }
    }

    return {
      page: TABLE_PAGE,
      pageSize: TABLE_SIZE,
      orderBy: TABLE_ORDERBY,
      orderDirection: TABLE_ORDERDIR,
      total: TABLE_TOTAL,
      hasInitialParams,
    };
  }, [search]);

  return params;
};
