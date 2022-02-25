import { useState, useMemo } from 'react';
import { useTableParams } from './useTableParams';

type WithTotal = 0 | 1;

export const useTable = () => {
  const tableParams = useTableParams();

  const [page, pageSet] = useState(tableParams.page);
  const [pageSize, pageSizeSet] = useState(tableParams.pageSize);
  const [orderBy, orderBySet] = useState(tableParams.orderBy);
  const [orderDirection, orderDirectionSet] = useState(
    tableParams.orderDirection,
  );

  const offset = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  const withTotal = useMemo(() => 1 as WithTotal, []);

  return {
    withTotal,
    with_total: withTotal,
    offset,
    page,
    pageSet,
    pageSize,
    limit: pageSize,
    pageSizeSet,
    orderBy,
    order_by: orderBy,
    orderBySet,
    orderDirection,
    order_direction: orderDirection,
    orderDirectionSet,
  };
};
