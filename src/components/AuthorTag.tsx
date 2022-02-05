import React from 'react';
import { Link } from 'react-router-dom';
import type { UserData } from 'src/interfaces/APIDataInterfaces';
import { getUserFeedRoute } from '../utils/routeGetters';

interface AuthorTagProps {
  author: UserData;
}

function AuthorTag({ author }: AuthorTagProps) {
  return (
    <Link to={getUserFeedRoute(author._id)}>
      <div>
        by
        {author.username}
      </div>
    </Link>
  );
}

export default AuthorTag;
