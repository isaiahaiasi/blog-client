import { createContext } from 'react';

interface DataStoreInterface {
  getItem: (key: string) => any | null;
  setItem: (key: string, item: any) => void;
}

export const DataStoreContext = createContext<DataStoreInterface>({
  getItem: (key: string) => {
    throw new Error('Not implemented');
  },
  setItem: (key: string, item: any) => {
    throw new Error('Not implemented');
  },
});
