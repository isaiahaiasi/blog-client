import React, { useContext } from 'react';
import UserContext from '../contexts/user';
import type {
  APIResponseBody,
  CommentData,
} from '../interfaces/APIDataInterfaces';
import ErrorDialog from './ErrorDialog';
import Loading from './Loading';
import Comment from './Comment';
import CommentForm from './forms/CommentForm';

interface CommentListProps {
  commentData?: APIResponseBody<CommentData[]>;
  isLoading: boolean;
  error: unknown;
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

export default function CommentList({
  commentData,
  isLoading,
  error,
}: CommentListProps) {
  const [user] = useContext(UserContext);

  const contentLength = commentData?.content?.length ?? -1;

  return (
    <section>
      <h2>Comments</h2>
      {user && <CommentForm />}
      {isLoading && <Loading />}
      {contentLength > 0 &&
        commentData &&
        renderCommentList(commentData.content)}
      {contentLength === 0 && (
        <p className="text-light text-center">No comments… yet!</p>
      )}
      {error && <ErrorDialog message={(error as any).toString()} />}
    </section>
  );
}
