import { useContext, useEffect, useState } from 'react';
import { DataStoreContext } from '../contexts/dataStore';
import useFetch from './useFetch';

// hook to retrieve data from DataStore context provider
// if it does not return a result, attempt to get data from API
// if API returns response, add it to DataStore to reduce unnecessary API calls
export default function useDataStore(query: string) {
  const { getItem, setItem } = useContext(DataStoreContext);
  const [data, setData] = useState(getItem(query));

  const { fetchState, error, doFetch } = useFetch(query, {
    credentials: 'include',
  });

  useEffect(() => {
    if (!data && !fetchState?.loading) {
      doFetch();
    }
  }, []);

  // attempt to update data store with fetched data
  useEffect(() => {
    if (!fetchState || !fetchState.value) {
      return;
    }

    const response = fetchState.value;

    if (response && typeof response.body == 'object' && response.body.content) {
      setItem(query, response.body.content);
      setData(response.body.content);
    }
  }, [fetchState]);

  return { data, isLoading: fetchState.loading, error };
}
