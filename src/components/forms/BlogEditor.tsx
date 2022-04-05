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
import { UNAUTHORIZED_RESPONSE } from '../../utils/authHelpers';
import type { InputData } from './Form';
import FormFieldList from '../FormFieldList';

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

const inputDataList: InputData[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
  },
  {
    name: 'content',
    label: 'Content',
    type: 'textarea',
  },
  {
    name: 'publishDate',
    label: 'Publish Date',
    type: 'local-datetime',
  },
];

function BlogEditorForm({ blog }: { blog?: BlogData }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);

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
      onError: (data) => {
        if (data === UNAUTHORIZED_RESPONSE) {
          console.error('Session could not be verified. Logging out...');
          setUser(null);
        }
      },
    },
  );

  const { mutate: deleteBlog } = useMutation(
    blog
      ? async () => fetchDeleteBlog(blog)
      : async () => console.error('No blog post provided to delete'),
    {
      onSuccess: () => {
        navigate('..');
        queryClient.invalidateQueries('all-blogs');
      },
      onError: (data) => {
        if (data === UNAUTHORIZED_RESPONSE) {
          console.error('Session could not be verified. Logging out...');
          setUser(null);
        }
      },
    },
  );

  const onSubmit: SubmitHandler<BlogEditorInputs> = (data) =>
    mutation.mutate(data);

  return (
    <>
      <form
        name="blog-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
        className="card dashboard__form"
      >
        <FormFieldList
          inputDataList={inputDataList}
          register={register as any}
          errors={errors}
        />
        <input type="submit" id="post-publishDate" value="Publish" />
      </form>
      <button type="submit" onClick={() => deleteBlog()}>
        Delete blog post
      </button>

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
