// TODO: localStorage integration
// I *wanted* to use my useStickyreducer hook,
// but for that I need a separate instance for each item,
// and I'm not really sure that's possible...

import type { Reducer } from 'react';

// TODO: is this too much all in one block of state???

interface DataStoreReducerAction {
  type: 'put' | 'delete';
  key: string;
  data?: any;
}

export const dataStoreReducer: Reducer<any, DataStoreReducerAction> = (
  state: Record<string, any>,
  { type, key, data },
) => {
  switch (type) {
    case 'put':
      return { ...state, [key]: data };
    case 'delete':
      const tmpState = { ...state };
      tmpState[key] = undefined;
      return tmpState;
    default:
      throw new Error(`Cannot find DataStore reducer action type ${type}.`);
  }
};

export default dataStoreReducer;
