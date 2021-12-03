import React, { useReducer } from 'react';
import { DataStoreContext } from '../contexts/dataStore';
import dataStoreReducer from '../utils/dataStoreReducer';
import type { ChildrenProps } from '../interfaces/propsInterfaces';

export default function DataStore({ children }: ChildrenProps) {
  const [store, dispatch] = useReducer(dataStoreReducer, {});

  function getItem(key: string) {
    return store[key] ?? null;
  }

  function setItem(key: string, data: any) {
    dispatch({ type: 'put', key, data });
  }

  return (
    <DataStoreContext.Provider value={{ getItem, setItem }}>
      {children}
    </DataStoreContext.Provider>
  );
}
