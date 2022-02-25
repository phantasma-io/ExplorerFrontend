import { useState } from 'react';
import { useTableParams } from './useTableParams';

export const useTable = () => {
  const tableParams = useTableParams();

  const [page, pageSet] = useState(tableParams.page);
  const [pageSize, pageSizeSet] = useState(tableParams.pageSize);
  const [orderBy, orderBySet] = useState(tableParams.orderBy);
  const [orderDirection, orderDirectionSet] = useState(
    tableParams.orderDirection,
  );

  return {
    page,
    pageSet,
    pageSize,
    pageSizeSet,
    orderBy,
    orderBySet,
    orderDirection,
    orderDirectionSet,
  };
};
