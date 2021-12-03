import React, { useContext } from 'react';
import { useParams } from 'react-router';
import Blog from '../components/Blog';
import Comment from '../components/Comment';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import useDataStore from '../hooks/useDataStore';
import {
  getBlogAPIEndpoint,
  getBlogCommentsAPIEndpoint,
} from '../utils/routeGetters';
import NotFound from './NotFound';

export default function BlogPage() {
  const { blogid } = useParams();
  const [user] = useContext(UserContext);
  const { data, isLoading, error } = useDataStore(
    getBlogAPIEndpoint(blogid ?? 'undefined'),
  );

  const {
    data: cmtData,
    isLoading: cmtLoading,
    error: cmtErr,
  } = useDataStore(getBlogCommentsAPIEndpoint(blogid ?? 'undefined'));

  if (isLoading) {
    return <Loading />;
  } else if (!data) {
    return <NotFound />;
  } else {
    return (
      <article>
        {error && <div>{error as string}</div>}
        <Blog data={data} />
        <section>
          <h2>Comments</h2>
          {user && <div>(comment form)</div>}
          {cmtLoading && <Loading />}
          {cmtData && renderCommentList(cmtData)}
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
