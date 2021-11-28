import { Reducer, ReducerState, useEffect, useReducer } from 'react';

export default function useStickyReducer<R extends Reducer<any, any>, I>(
  reducer: R,
  initialArg: ReducerState<R>,
  key: string,
): [state: ReducerState<R>, dispatch: React.Dispatch<React.ReducerAction<R>>] {
  function getFromStorage(initArg: I) {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : initArg;
  }

  const [state, dispatch] = useReducer<R, I>(
    reducer,
    initialArg,
    getFromStorage,
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}
