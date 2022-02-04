import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import BlogFeed from '../components/BlogFeed';
import { fetchGetUserBlogs } from '../utils/queryFns';

export default function UserFeed() {
  const { userid } = useParams();

  if (!userid) {
    throw new Error('Invalid URL for UserFeed: userid param not found.');
  }

  const { data, isLoading, error } = useQuery(`userfeed-${userid}`, () => fetchGetUserBlogs(userid));

  return <BlogFeed blogs={data?.content} isLoading={isLoading} error={error} />;
}
