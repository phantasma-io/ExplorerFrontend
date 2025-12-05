import { useState, useMemo } from 'react';
import { WithOption } from 'types/api';
import { usePersistentState } from './usePersistentState';
import { useTableParams } from './useTableParams';

export const useTable = () => {
  const tableParams = useTableParams();

  const [page, pageSet] = useState(tableParams.page);
  const [pageSize, pageSizeSet] = usePersistentState(
    'PhantasmaExplorer-rowSize',
    tableParams.pageSize,
  );
  const [orderBy, orderBySet] = useState(tableParams.orderBy);
  const [orderDirection, orderDirectionSet] = useState(
    tableParams.orderDirection,
  );

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
