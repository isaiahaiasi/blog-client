import React from 'react';
import Form, { InputData } from './Form';

const inputData: InputData = {
  label: 'Add Comment',
  name: 'comment',
  type: 'text',
  validation: {
    minLength: 1,
  },
};

export default function CommentForm() {
  const fetchFn = (formData: any) => {
    console.log('Comment form fetch function');
    return {
      content: formData,
      success: true,
    };
  };

  const onSuccess = (data: any) => {
    console.log('success!');
    console.log(data);
  };

  const onError = (data: any) => {
    console.log('success!');
    console.log(data);
  };

  return (
    <Form
      inputDataList={[inputData]}
      fetchFn={fetchFn}
      mutationOptions={{ onSuccess, onError }}
    />
  );
}
