import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../contexts/user';
import { isLoggedIn } from '../utils/authHelpers';
import {
  getEditUserRoute,
  getUserFeedRoute,
  loginRoute,
  logoutRoute,
} from '../utils/routeGetters';

export default function Profile() {
  const userContext = useContext(UserContext);

  if (!isLoggedIn(userContext)) {
    return <Navigate replace to={loginRoute} />;
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
      {linkList.map(([link, text]) => (
        <Link to={link} key={link}>
          {text}
        </Link>
      ))}
    </div>
  );
}
