// https://stackoverflow.com/a/65338730/16339281
// TODO: write tests, or replace with react-use

import { useCallback, useEffect, useState } from 'react';
import { useIsMounted } from './useIsMounted';

// TODO properly type args

type UseAsyncFnReturn = [boolean, () => void];

export function useAsyncFn(fn: any, dependencyArray: any[]): UseAsyncFnReturn {
  const isMounted = useIsMounted();
  const [isActive, setIsActive] = useState<boolean>(false);

  const doAsyncFn = useCallback(fn, dependencyArray);

  useEffect(() => {
    if (isActive) {
      (async () => {
        console.log('async hmm');
        await doAsyncFn();
        if (isMounted()) {
          setIsActive(false);
        }
      })();
    }
  }, [isActive, isMounted /* , doAsyncFn */]);

  return [isActive, () => setIsActive(true)];
}
