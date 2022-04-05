import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostComment } from '../../utils/queryFns';
import Form, { InputData } from './Form';

const inputData: InputData = {
  label: 'Add Comment',
  name: 'content',
  type: 'text',
  validation: {
    minLength: 2,
  },
};

export default function CommentForm() {
  const { blogid } = useParams();

  const fetchFn = (formData: any) =>
    fetchPostComment(blogid ?? 'undefined', formData);

  const onSuccess = (data: any) => {
    console.log('TODO: invalidate react-query cache!');
    console.log(data);
  };

  return (
    <Form
      formName="comment-form"
      inputDataList={[inputData]}
      fetchFn={fetchFn}
      mutationOptions={{ onSuccess }}
    />
  );
}
