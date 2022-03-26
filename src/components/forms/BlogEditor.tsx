/* eslint-disable react/jsx-props-no-spreading */
import { format, parseISO } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import type { BlogData } from '../../interfaces/APIDataInterfaces';
import UserContext from '../../contexts/user';
import {
  fetchDeleteBlog,
  fetchPostUserBlog,
  fetchPutBlog,
} from '../../utils/queryFns';
import ErrorDialog from '../ErrorDialog';

interface BlogEditorProps {
  blogs: BlogData[];
}

export interface BlogEditorInputs {
  title: string;
  content: string;
  publishDate: string;
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
    async (formData) =>
      blog ? fetchPutBlog(blog, formData) : fetchPostUserBlog(user, formData),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries('all-blogs');
        navigate(`/dashboard/${data.content._id}`);
      },
    },
  );

  const { mutate: deleteBlog } = useMutation(
    blog
      ? async () => fetchDeleteBlog(blog)
      : // eslint-disable-next-line no-console
        async () => console.error('No blog post provided to delete'),
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
        className="card dashboard__form"
      >
        <div className="form-field">
          <label htmlFor="post-title" className="text-light">
            Title
          </label>
          <input
            type="text"
            id="post-title"
            {...register('title', { required: true })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="post-content" className="text-light">
            Content
          </label>
          <textarea
            id="post-content"
            {...register('content', { required: true })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="post-publishDate" className="text-light">
            Publish date
          </label>
          <input
            type="datetime-local"
            {...register('publishDate', { required: true })}
          />
        </div>
        <input type="submit" id="post-publishDate" value="Publish" />
      </form>
      <button type="submit" onClick={() => deleteBlog()}>
        Delete blog post
      </button>

      {/* TODO: real UI for displaying errors */}

      {errors &&
        Object.entries(errors).map(([k, v]) => (
          <ErrorDialog key={k} message={[k, v].join().toString()} />
        ))}
    </>
  );
}

// a wrapper Component so that I can pass the blog as a prop & force form to rerender
export default function BlogEditor({ blogs }: BlogEditorProps) {
  const { blogid } = useParams();
  const blog = blogs?.find((b) => b._id === blogid);
  return <BlogEditorForm blog={blog} />;
}
