import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import type { CommentData } from 'src/interfaces/APIDataInterfaces';
import Blog from '../components/Blog';
import Comment from '../components/Comment';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import { fetchGetBlog, fetchGetBlogComments } from '../utils/queryFns';
import NotFound from './NotFound';

function renderCommentList(data: CommentData[]) {
  return (
    <ul>
      {data?.map &&
        data.map((comment) => (
          <li key={comment._id}>
            <Comment comment={comment} />
          </li>
        ))}
    </ul>
  );
}

export default function BlogPage() {
  const [user] = useContext(UserContext);
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
    <article>
      {error && <ErrorDialog message={(error as any).message} />}
      <Blog data={data?.content} />
      <section>
        <h2>Comments</h2>
        {user && <div>(comment form)</div>}
        {cmtLoading && <Loading />}
        {cmtData && renderCommentList(cmtData.content)}
        {cmtErr && <ErrorDialog message={(cmtErr as any).toString()} />}
      </section>
    </article>
  );
}
