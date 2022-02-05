import React from 'react';
import { useQuery } from 'react-query';
import BlogFeed from '../components/BlogFeed';
import { fetchGetDiscover } from '../utils/queryFns';

export default function Discover() {
  const { data, isLoading, error } = useQuery('discover', () => fetchGetDiscover());

  return <BlogFeed blogs={data?.content} isLoading={isLoading} error={error} />;
}
