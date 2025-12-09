import React, { useMemo, SetStateAction, Dispatch } from 'react';
import { DatetimeOptsChoices, DatetimeOptsContext } from './useDatetimeOpts';

export interface DatetimeOptsProviderProps {
  children?: JSX.Element;
  dtOps?: DatetimeOptsChoices;
  dtOpsSet?: Dispatch<SetStateAction<DatetimeOptsChoices>>;
}

export const DatetimeOptsProvider = ({
  children,
}: DatetimeOptsProviderProps) => {
  const ctx = useMemo(
    () => ({
      dtOpts: 'local' as DatetimeOptsChoices,
      dtOptsSet: () => undefined,
    }),
    [],
  );

  return (
    <DatetimeOptsContext.Provider value={ctx}>
      {children}
    </DatetimeOptsContext.Provider>
  );
};
