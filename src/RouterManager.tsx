import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import UserContext from './contexts/user';
import BlogPage from './pages/BlogPage';
import Dashboard from './pages/Dashboard';
import Discover from './pages/Discover';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';

// NOTE <Redirect> removed in react-router v6
// current solution involves Navigate, but there may be issues
// see gist: https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb

export default function RouterManager() {
  const [user] = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/discover" />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/blog/:blogid" element={<BlogPage />} />
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Navigate replace to="/discover" />} />
          <Route
            path="/register"
            element={<Navigate replace to="/discover" />}
          />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Navigate replace to="/login" />} />
          <Route path="/profile" element={<Navigate replace to="/login" />} />
        </>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
