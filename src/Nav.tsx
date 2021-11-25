import React, { useContext } from 'react';
import UserContext from './contexts/User';

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
          <li key={link}>{text}</li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
