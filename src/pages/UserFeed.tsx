import React from 'react';
import { useParams } from 'react-router';
import BlogFeed from '../components/BlogFeed';
import useDataStore from '../hooks/useDataStore';
import { getUserBlogsAPIEndpoint } from '../utils/routeGetters';

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error(`Invalid URL for UserFeed: userid param not found.`);
  }

  const { data, isLoading, error } = useDataStore(
    getUserBlogsAPIEndpoint(userid),
  );

  return <BlogFeed blogs={data} isLoading={isLoading} error={error} />;
}
