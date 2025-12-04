import { useEffect, useState, useMemo } from 'react';
import { WithOption } from 'types/api';
import { useTableParams } from './useTableParams';
import { useLocalStorage } from './useLocalStorage';

export const useTable = () => {
  const { hasInitialParams, ...tableParams } = useTableParams();

  const [page, pageSet] = useState(tableParams.page);
  const [pageSize, pageSizeSet] = useLocalStorage(
    'PhantasmaExplorer-rowSize',
    tableParams.pageSize,
  );
  const [orderBy, orderBySet] = useState(tableParams.orderBy);
  const [orderDirection, orderDirectionSet] = useState(
    tableParams.orderDirection,
  );

  useEffect(() => {
    if (hasInitialParams) {
      pageSizeSet(tableParams.pageSize);
    }
  }, [hasInitialParams, pageSizeSet, tableParams.pageSize]);

  const offset = useMemo(() => (page - 1) * pageSize, [page, pageSize]);

  const withTotal = useMemo(() => 1 as WithOption, []);

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
