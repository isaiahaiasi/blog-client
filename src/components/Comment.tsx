import React from 'react';
import AuthorTag from './AuthorTag';
import Timestamp from './Timestamp';

interface CommentProps {
  comment: CommentData;
}

function Comment({ comment }: CommentProps) {
  return (
    <div>
      <div>{comment.content}</div>
      <div className="w-full flex justify-between italic text-gray-500">
        <AuthorTag author={comment.author} />
        <Timestamp date={comment.createdAt} />
      </div>
    </div>
  );
}

export default Comment;
