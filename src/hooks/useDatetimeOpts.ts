import { useLocalState } from '@ricardojrmcom/reaper';

export const useDatetimeOpts = () => {
  const [dtOpts, dtOptsSet] = useLocalState<'local' | 'utc' | 'unix'>(
    'PhantasmaExplorer-datetimeopts',
    'local',
  );

  return { dtOpts, dtOptsSet };
};
