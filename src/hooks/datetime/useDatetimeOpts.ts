import { useContext, createContext, SetStateAction, Dispatch } from 'react';

export type DatetimeOptsChoices = 'local' | 'utc' | 'unix';
export interface DatetimeOptsContextType {
  dtOpts: DatetimeOptsChoices;
  dtOptsSet: Dispatch<SetStateAction<DatetimeOptsChoices>>;
}

const init: DatetimeOptsContextType = {
  dtOpts: 'local',
  dtOptsSet: () => undefined,
};

export const DatetimeOptsContext = createContext<DatetimeOptsContextType>(init);

export const useDatetimeOpts = () => useContext(DatetimeOptsContext);
