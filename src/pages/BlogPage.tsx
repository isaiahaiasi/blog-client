import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import Comment from '../components/Comment';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import { fetchGetBlog, fetchGetBlogComments } from '../utils/queryFns';
import NotFound from './NotFound';

export default function BlogPage() {
  const [user] = useContext(UserContext);
  const { blogid } = useParams();
  const { data, isLoading, error } = useQuery(
    blogid ?? 'undefined',
    fetchGetBlog,
  );

  const {
    data: cmtData,
    isLoading: cmtLoading,
    error: cmtErr,
  } = useQuery((blogid ?? 'undefined') + '/comment', () =>
    fetchGetBlogComments(blogid),
  );

  if (isLoading) {
    return <Loading />;
  } else if (!data) {
    return <NotFound />;
  } else {
    return (
      <article>
        {error && <ErrorDialog message={(error as any).message} />}
        <Blog data={data?.content} />
        <section>
          <h2>Comments</h2>
          {user && <div>(comment form)</div>}
          {cmtLoading && <Loading />}
          {cmtData && renderCommentList(cmtData.content)}
        </section>
      </article>
    );
  }
}

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
