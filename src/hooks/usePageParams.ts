import { useMemo } from 'react';
// import { useRouter } from 'next/router';
import { TABLE_PAGE, TABLE_SIZE } from '../cfg';
import { decode, queryToObj } from '../scripts';

export const usePageParams = () => {
  let location: Location | undefined;

  if (typeof window !== 'undefined') {
    location = window.location;
  }

  const params = useMemo(() => {
    if (location) {
      const obj = queryToObj(location.search);
      if (obj.t) {
        const decoded = decode(obj.t as string);
        return {
          pageParam: decoded.page || TABLE_PAGE,
          pageSizeParam: decoded.pageSize || TABLE_SIZE,
        };
      }
    }

    return {
      pageParam: TABLE_PAGE,
      pageSizeParam: TABLE_SIZE,
    };
  }, [location]);

  // const { query } = useRouter();
  // const params = useMemo(() => {
  //   console.log({ query });

  //   if (query.t) {
  //     const decoded = decode(query.t as string);
  //     return {
  //       pageParam: decoded.page || TABLE_PAGE,
  //       pageSizeParam: decoded.pageSize || TABLE_SIZE,
  //     };
  //   }

  //   return {
  //     pageParam: TABLE_PAGE,
  //     pageSizeParam: TABLE_SIZE,
  //   };
  // }, [query]);

  return params;
};
