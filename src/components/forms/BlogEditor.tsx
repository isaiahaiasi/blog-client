import { format } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import UserContext from '../../contexts/user';
import { usePrompt } from '../../hooks/usePrompt';
import fetchData from '../../utils/fetchData';
import {
  getBlogAPIEndpoint,
  getUserBlogsAPIEndpoint,
} from '../../utils/routeGetters';

interface BlogEditorProps {
  blogs: BlogData[];
}

interface Inputs {
  title: string;
  content: string;
  publishDate: string;
}

// TODO: need to unmount editor when switching between posts to edit,
// TODO: in order for react-hook-form to update
// (an alternative would be the reset API for rhf, that seems a little daunting)

// TODO? - find non-blocking solution for saving user's drafts
// (ie, just save the draft in state, maybe displaying that there are unsaved changes)
// But tbh, blocking might be preferable UX in many cases. That draft state is
// likely going to be considered ephemeral by the user, so a simple warning to
// deal with it in the moment seems like a perfectly acceptable solution.

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
  // TODO: wrap this redundant stuff somehow
  if (!user) {
    return <Navigate to="/login" />;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: getDefaultValues(blog),
  });

  useEffect(() => {
    reset(getDefaultValues(blog));
  }, [blog]);

  const mutation = useMutation<any, unknown, Inputs, unknown>(
    async (formData) => {
      return blog
        ? await submitUpdatedBlog(blog, formData)
        : await submitNewBlog(user, formData);
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

  const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);

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

async function submitUpdatedBlog(blog: BlogData, formData: Inputs) {
  return await fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'PUT',
    body: formData,
  });
}

async function submitNewBlog(user: UserData, formData: Inputs) {
  return await fetchData(getUserBlogsAPIEndpoint(user._id), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

async function fetchDeleteBlog(blog: BlogData) {
  return await fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'DELETE',
  });
}
