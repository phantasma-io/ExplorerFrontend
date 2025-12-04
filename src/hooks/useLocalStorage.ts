import { useCallback, useState, SetStateAction } from 'react';

const isBrowser = () => typeof window !== 'undefined';

const parseStoredValue = <T>(value: string | null, fallback: T) => {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch (err) {
    return fallback;
  }
};

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const readValue = useCallback((): T => {
    if (!isBrowser()) {
      return initialValue;
    }

    return parseStoredValue<T>(window.localStorage.getItem(key), initialValue);
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(() => readValue());

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      setStoredValue((prevState) => {
        const nextValue =
          typeof value === 'function'
            ? (value as (prev: T) => T)(prevState)
            : value;

        if (isBrowser()) {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, setValue] as const;
};
