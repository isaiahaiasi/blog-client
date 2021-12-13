import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { usePrompt } from '../../hooks/usePrompt';
import fetchData from '../../utils/fetchData';

interface BlogEditorProps {
  blog: BlogData;
}

interface Inputs {
  title: string;
  content: string;
  publishDate: string;
}

// TODO? - find non-blocking solution for saving user's drafts
// (ie, just save the draft in state, maybe displaying that there are unsaved changes)
// But tbh, blocking might be preferable UX in many cases. That draft state is
// likely going to be considered ephemeral by the user, so a simple warning to
// deal with it in the moment seems like a perfectly acceptable solution.
export default function BlogEditor({ blog }: BlogEditorProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: blog.title,
      content: blog.content,
      publishDate: format(parseISO(blog.publishDate), "yyyy-MM-dd'T'hh:mm"),
    },
  });

  const mutation = useMutation<any, unknown, Inputs, unknown>(
    async (formData) => {
      // return await fetchData('POST BLOG URL', {
      //   credentials: 'include',
      //   method: 'POST',
      //   body: formData,
      // });
      console.log(formData);
    },
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);

  usePrompt('Are you sure?', true);
  return (
    <form name="blog-form" aria-label="form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register('title', { required: true })} />
      <textarea {...register('content', { required: true })} />
      <input
        type="datetime-local"
        {...register('publishDate', { required: true })}
      />
      <input type="submit" value="Publish" />
    </form>
  );
}
