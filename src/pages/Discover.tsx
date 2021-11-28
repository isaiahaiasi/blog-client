import React from 'react';
import BlogFeed from '../components/BlogFeed';
import useDataStore from '../hooks/useDataStore';
import { getDiscoverAPIEndpoint } from '../utils/routeGetters';

export default function Discover() {
  const { data, isLoading, error } = useDataStore(getDiscoverAPIEndpoint());
  return <BlogFeed blogs={data} isLoading={isLoading} error={error} />;
}
