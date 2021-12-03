import React from 'react';
import { Link } from 'react-router-dom';
import { getUserFeedRoute } from '../utils/routeGetters';

interface AuthorTagProps {
  author: UserData;
}

const AuthorTag = ({ author }: AuthorTagProps) => (
  <Link to={getUserFeedRoute(author._id)}>
    <div>by {author.username}</div>
  </Link>
);

export default AuthorTag;
