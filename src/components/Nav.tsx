import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/user';

interface NavProps {}

function Nav({}: NavProps) {
  const user = useContext(UserContext);

  function getNavList() {
    return user
      ? [
          ['Dashboard', '/dashboard'],
          ['Discover', '/discover'],
          ['Profile', '/profile'],
        ]
      : [
          ['Discover', '/discover'],
          ['Login', '/login'],
          ['Register', '/register'],
        ];
  }

  return (
    <nav>
      <ul>
        {getNavList().map(([text, link]) => (
          <Link key={link} to={link}>
            {text}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
