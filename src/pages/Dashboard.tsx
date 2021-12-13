import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import EditorSidebar from '../components/EditorSidebar';
import BlogEditor from '../components/forms/BlogEditor';
import UserContext from '../contexts/user';
import fetchData from '../utils/fetchData';
import { getUserBlogsAuthorizedEndpoint } from '../utils/routeGetters';

export default function Dashboard() {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const [activeBlogId, setActiveBlogId] = useState<string | undefined>();

  const { data, isLoading, error } = useQuery('all-blogs', () =>
    fetchData(getUserBlogsAuthorizedEndpoint(user._id), {
      credentials: 'include',
    }),
  );

  const getActiveBlog = (blogId?: string) =>
    data && blogId
      ? data.content?.find((blog: BlogData) => blog._id === blogId)
      : null;

  return (
    <div>
      <EditorSidebar
        blogs={data?.content}
        isLoading={isLoading}
        setActiveBlogId={setActiveBlogId}
      />
      {activeBlogId ? (
        <BlogEditor blog={getActiveBlog(activeBlogId)} />
      ) : (
        <p>Choose a blog to update, or write a new one!</p>
      )}
    </div>
  );
}
