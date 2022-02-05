import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorDialog from '../components/ErrorDialog';
import EditorSidebar from '../components/EditorSidebar';
import BlogEditor from '../components/forms/BlogEditor';
import UserContext from '../contexts/user';
import { fetchGetUserAllBlogs } from '../utils/queryFns';

export default function Dashboard() {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const { data, isLoading, error } = useQuery('all-blogs', () => fetchGetUserAllBlogs(user));

  return (
    <div>
      <EditorSidebar blogs={data?.content} isLoading={isLoading} />
      { error && <ErrorDialog message={JSON.stringify(error)} />}
      <Routes>
        <Route path="/" element={<p>No selected post...</p>} />
        <Route path=":blogid" element={<BlogEditor blogs={data?.content} />} />
      </Routes>
    </div>
  );
}
