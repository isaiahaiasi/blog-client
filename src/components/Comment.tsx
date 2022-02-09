import React from 'react';
import type { CommentData } from 'src/interfaces/APIDataInterfaces';
import MetaGroup from './MetaGroup';

interface CommentProps {
  comment: CommentData;
}

function Comment({ comment }: CommentProps) {
  return (
    <div>
      <div>{comment.content}</div>
      <MetaGroup data={comment} />
    </div>
  );
}

export default Comment;
