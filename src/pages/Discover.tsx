import React from 'react';
import BlogFeed from '../components/BlogFeed';
import useGetData from '../hooks/useDataStore';
import { SNOWPACK_PUBLIC_API_URL } from '../utils/envManager';

export default function Discover() {
  const DISCOVER_QUERY = `${SNOWPACK_PUBLIC_API_URL}/blogs`;
  const { data, isLoading, error } = useGetData(DISCOVER_QUERY);
  return <BlogFeed blogs={data} isLoading={isLoading} error={error} />;
}
