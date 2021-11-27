import { useContext, useEffect, useState } from 'react';
import { DataStoreContext } from '../contexts/dataStore';
import useFetch from './useFetch';

// hook to retrieve data from DataStore context provider
// if it does not return a result, attempt to get data from API
// if API returns response, add it to DataStore to reduce unnecessary API calls
export default function useDataStore(query: string) {
  const { getItem, setItem } = useContext(DataStoreContext);

  // trigger for fetch
  const [fetchRef, setFetchRef] = useState({ current: false });

  const { isLoading, response, error } = useFetch(query, fetchRef, {});

  const [data, setData] = useState(getItem(query));

  useEffect(() => {
    if (!data) {
      setFetchRef({ current: true });
    }
  }, []);

  useEffect(() => {
    if (response && typeof response.body == 'object' && response.body.content) {
      setItem(query, response.body.content);
      setData(response.body.content);
    }
  }, [response]);

  return { data, isLoading: isLoading && !data, error };
}
