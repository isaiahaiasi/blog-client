import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorDialog from '../components/ErrorDialog';
import EditorSidebar from '../components/EditorSidebar';
import BlogEditor from '../components/forms/BlogEditor';
import UserContext from '../contexts/user';
import { fetchGetUserAllBlogs } from '../utils/queryFns';
import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery';

export default function Dashboard() {
  const [user] = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const { data, isLoading, error } = useAuthenticatedQuery<any>(
    'all-blogs',
    () => fetchGetUserAllBlogs(user),
  );

  return (
    <>
      {error && <ErrorDialog message={JSON.stringify(error)} />}
      <div className="dashboard">
        <EditorSidebar blogs={data?.content} isLoading={isLoading} />
        <div className="dashboard__editor">
          <Routes>
            <Route path="/" element={<p>No selected post...</p>} />
            <Route
              path=":blogid"
              element={<BlogEditor blogs={data?.content} />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
