import React from 'react';
import { useQuery } from 'react-query';
import BlogFeed from '../components/BlogFeed';
import fetchData from '../utils/fetchData';
import { getDiscoverAPIEndpoint } from '../utils/routeGetters';

export default function Discover() {
  const { data, isLoading, error } = useQuery('discover', () =>
    fetchData(getDiscoverAPIEndpoint()),
  );

  return <BlogFeed blogs={data?.content} isLoading={isLoading} error={error} />;
}
