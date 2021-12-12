import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../contexts/user';

export default function Logout() {
  const [, setUser] = useContext(UserContext);

  useEffect(() => {
    setUser(null);
  }, []);

  return <Navigate to="/login" />;
}
