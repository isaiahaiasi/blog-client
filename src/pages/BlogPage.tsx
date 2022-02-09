import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CommentList from '../components/CommentList';
import Blog from '../components/Blog';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import { fetchGetBlog, fetchGetBlogComments } from '../utils/queryFns';
import NotFound from './NotFound';

export default function BlogPage() {
  const { blogid } = useParams();
  const { data, isLoading, error } = useQuery(blogid ?? 'undefined', () =>
    fetchGetBlog(blogid ?? 'undefined'),
  );

  const {
    data: cmtData,
    isLoading: cmtLoading,
    error: cmtErr,
  } = useQuery(`${blogid ?? 'undefined'}/comment`, () =>
    fetchGetBlogComments(blogid),
  );

  if (isLoading) {
    return <Loading />;
  }
  if (!data) {
    return <NotFound />;
  }
  return (
    <article className="main-content-container full-blog-container">
      {error && <ErrorDialog message={(error as any).message} />}
      <Blog data={data?.content} />
      <CommentList
        commentData={cmtData}
        error={cmtErr}
        isLoading={cmtLoading}
      />
    </article>
  );
}
