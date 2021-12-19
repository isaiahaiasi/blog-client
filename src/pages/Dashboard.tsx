import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
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

  const { data, isLoading, error } = useQuery('all-blogs', () =>
    fetchData(getUserBlogsAuthorizedEndpoint(user._id), {
      credentials: 'include',
    }),
  );

  const [formReset, setFormReset] = useState(() => {});

  return (
    <div>
      <EditorSidebar blogs={data?.content} isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<p>No selected post...</p>} />
        <Route path=":blogid" element={<BlogEditor blogs={data?.content} />} />
      </Routes>
    </div>
  );
}
