import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../contexts/user';
import isLoggedIn from '../utils/authHelpers';
import {
  getEditUserRoute,
  getUserFeedRoute,
  loginRoute,
  logoutRoute,
} from '../utils/routeGetters';
import NotFound from './NotFound';

export default function Profile() {
  const userContext = useContext(UserContext);

  if (!isLoggedIn(userContext)) {
    return <Navigate replace to={loginRoute} />;
  }

  if (!userContext[0]) {
    console.error('User was not provided!');
    return <NotFound />;
  }

  const [{ _id, username }] = userContext;

  const linkList = [
    [getUserFeedRoute(_id), username],
    [getEditUserRoute(_id), 'Edit Profile'],
    [logoutRoute, 'Logout'],
  ];

  return (
    <div>
      <h2>Profile</h2>
      <ul>
        {linkList.map(([link, text]) => (
          <li key={link}>
            <Link to={link}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
