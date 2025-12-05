import React, { useEffect, useMemo, useState, SetStateAction, Dispatch } from 'react';
import { DatetimeOptsChoices, DatetimeOptsContext } from './useDatetimeOpts';

export interface DatetimeOptsProviderProps {
  children?: JSX.Element;
  dtOps?: DatetimeOptsChoices;
  dtOpsSet?: Dispatch<SetStateAction<DatetimeOptsChoices>>;
}

const STORAGE_KEY = 'PhantasmaExplorer-datetimeopts';

const isValidChoice = (value: string | null): value is DatetimeOptsChoices =>
  value === 'local' ||
  value === 'utc' ||
  value === 'local-24' ||
  value === 'utc-24' ||
  value === 'unix';

const readStoredChoice = (): DatetimeOptsChoices | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isValidChoice(stored) ? stored : null;
};

export const DatetimeOptsProvider = ({
  children,
}: DatetimeOptsProviderProps) => {
  const [dtOpts, dtOptsSet] = useState<DatetimeOptsChoices>('utc');

  useEffect(() => {
    const stored = readStoredChoice();
    if (stored) {
      dtOptsSet(stored);
    }
  }, [dtOptsSet]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, dtOpts);
  }, [dtOpts]);

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
