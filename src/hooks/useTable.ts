import { useCallback, useMemo, useState } from 'react';
import { usePersistentState } from './usePersistentState';
import { useTableParams } from './useTableParams';

type PaginationMode = 'cursor' | 'offset';

export const useTable = (mode: PaginationMode = 'offset') => {
  const tableParams = useTableParams();

  const initialPage = mode === 'cursor' ? 1 : tableParams.page;
  const [page, pageSet] = useState(initialPage);
  const [pageSize, pageSizeSet] = usePersistentState(
    'PhantasmaExplorer-rowSize',
    tableParams.pageSize,
  );
  const [orderBy, orderBySet] = useState(tableParams.orderBy);
  const [orderDirection, orderDirectionSet] = useState(
    tableParams.orderDirection,
  );
  const [hasNext, hasNextSet] = useState<boolean>(tableParams.hasNext);
  const [cursors, cursorsSet] = useState<Record<number, string | null>>({
    1: null,
  });

  const cursor = useMemo(
    () => (mode === 'cursor' ? cursors[page] ?? null : undefined),
    [cursors, mode, page],
  );

  const resetPagination = useCallback(() => {
    pageSet(1);
    cursorsSet({ 1: null });
    hasNextSet(true);
  }, []);

  const onPageData = useCallback(
    (nextCursor: string | null | undefined, receivedCount: number) => {
      if (mode === 'cursor') {
        cursorsSet((prev) => {
          const next = { ...prev, [page + 1]: nextCursor ?? null };
          Object.keys(next).forEach((key) => {
            const keyNum = Number(key);
            if (Number.isFinite(keyNum) && keyNum > page + 1) {
              delete next[keyNum];
            }
          });
          return next;
        });
        hasNextSet(Boolean(nextCursor));
      } else {
        hasNextSet(receivedCount >= pageSize);
      }
    },
    [mode, page, pageSize],
  );

  const offset = useMemo(
    () => (mode === 'offset' ? (page - 1) * pageSize : 0),
    [mode, page, pageSize],
  );

  return {
    mode,
    cursor,
    hasNext,
    resetPagination,
    onPageData,
    offset,
    with_total: 0 as const,
    withTotal: 0 as const,
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
