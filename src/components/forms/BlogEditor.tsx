import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../contexts/user';
import {
  fetchDeleteBlog,
  fetchPostUserBlog,
  fetchPutBlog,
} from '../../utils/queryFns';

interface BlogEditorProps {
  blogs: BlogData[];
}

export interface BlogEditorInputs {
  title: string;
  content: string;
  publishDate: string;
}

// a wrapper Component so that I can pass the blog as a prop & force form to rerender
export default function BlogEditor({ blogs }: BlogEditorProps) {
  const { blogid } = useParams();
  const blog = blogs.find((blog) => blog._id === blogid);
  return <BlogEditorForm blog={blog} />;
}

function BlogEditorForm({ blog }: { blog?: BlogData }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [user] = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogEditorInputs>({
    defaultValues: getDefaultValues(blog),
  });

  useEffect(() => {
    reset(getDefaultValues(blog));
  }, [blog]);

  const mutation = useMutation<any, unknown, BlogEditorInputs, unknown>(
    async (formData) => {
      return blog
        ? await fetchPutBlog(blog, formData)
        : await fetchPostUserBlog(user, formData);
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('all-blogs');
        navigate('/dashboard/' + data.content._id);
      },
    },
  );

  const { mutate: deleteBlog } = useMutation(
    blog
      ? async () => await fetchDeleteBlog(blog)
      : async () => console.error('No blog post provided to delete'),
    {
      onSuccess: () => {
        navigate('..');
        queryClient.invalidateQueries('all-blogs');
      },
    },
  );

  const onSubmit: SubmitHandler<BlogEditorInputs> = (data) =>
    mutation.mutate(data);

  // ! tmp? browser prompt to prevent losing work
  // kind of hacky, and currently only works on first prompt!
  // usePrompt('Are you sure?', true);

  return (
    <>
      <form
        name="blog-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="text" {...register('title', { required: true })} />
        <textarea {...register('content', { required: true })} />
        <input
          type="datetime-local"
          {...register('publishDate', { required: true })}
        />
        <input type="submit" value="Publish" />
      </form>
      <button onClick={() => deleteBlog()}>Delete blog post</button>
    </>
  );
}

function getDefaultValues(blog?: BlogData) {
  return blog
    ? {
        title: blog.title,
        content: blog.content,
        publishDate: format(parseISO(blog.publishDate), "yyyy-MM-dd'T'hh:mm"),
      }
    : {
        title: 'New Blog Post',
        content: '',
        publishDate: format(new Date(), "yyyy-MM-dd'T'hh:mm"),
      };
}
