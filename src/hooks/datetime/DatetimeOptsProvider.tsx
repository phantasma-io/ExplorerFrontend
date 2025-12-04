import React, { useMemo, SetStateAction, Dispatch } from 'react';
import { useLocalStorage } from 'hooks';
import { DatetimeOptsChoices, DatetimeOptsContext } from './useDatetimeOpts';

export interface DatetimeOptsProviderProps {
  children?: JSX.Element;
  dtOps?: DatetimeOptsChoices;
  dtOpsSet?: Dispatch<SetStateAction<DatetimeOptsChoices>>;
}

export const DatetimeOptsProvider = ({
  children,
}: DatetimeOptsProviderProps) => {
  const [dtOpts, dtOptsSet] = useLocalStorage<DatetimeOptsChoices>('PhantasmaExplorer-datetimeopts', 'local');

  const ctx = useMemo(
    () => ({
      dtOpts,
      dtOptsSet,
    }),
    [dtOpts, dtOptsSet],
  );

  return (
    <DatetimeOptsContext.Provider value={ctx}>
      {children}
    </DatetimeOptsContext.Provider>
  );
};
