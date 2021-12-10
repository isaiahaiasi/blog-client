import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import BlogFeed from '../components/BlogFeed';
import fetchData from '../utils/fetchData';
import { getUserBlogsAPIEndpoint } from '../utils/routeGetters';

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error(`Invalid URL for UserFeed: userid param not found.`);
  }

  const { data, isLoading, error } = useQuery('userfeed-' + userid, () =>
    fetchData(getUserBlogsAPIEndpoint(userid)),
  );

  return <BlogFeed blogs={data?.content} isLoading={isLoading} error={error} />;
}
