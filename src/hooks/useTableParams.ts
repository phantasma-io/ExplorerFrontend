import { useMemo } from 'react';
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
  let location: Location | undefined;

  if (typeof window !== 'undefined') {
    location = window.location;
  }

  const params = useMemo<TableUrlParams>(() => {
    if (location) {
      const obj = queryToObj(location.search);
      if (obj.t) {
        const decoded = decode(obj.t as string);
        return {
          total: (decoded.total as number) || TABLE_TOTAL,
          page: (decoded.page as number) || TABLE_PAGE,
          pageSize: (decoded.pageSize as number) || TABLE_SIZE,
          orderBy: (decoded.orderBy as string) || TABLE_ORDERBY,
          orderDirection:
            (decoded.orderDirection as TableOrderDirection) || TABLE_ORDERDIR,
        };
      }
    }

    return {
      page: TABLE_PAGE,
      pageSize: TABLE_SIZE,
      orderBy: TABLE_ORDERBY,
      orderDirection: TABLE_ORDERDIR,
      total: TABLE_TOTAL,
    };
  }, [location]);

  return params;
};
