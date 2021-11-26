import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user';

interface NavProps {}

function Nav({}: NavProps) {
  const [user] = useContext(UserContext);

  // TEMP
  const activeStyle = {
    textDecoration: 'underline',
  };

  function getNavList() {
    return user === null
      ? [
          ['Discover', '/discover'],
          ['Login', '/login'],
          ['Register', '/register'],
        ]
      : [
          ['Dashboard', '/dashboard'],
          ['Discover', '/discover'],
          ['Profile', '/profile'],
        ];
  }

  return (
    <nav>
      <ul>
        {getNavList().map(([text, link]) => (
          <NavLink
            key={link}
            to={link}
            style={({ isActive }) => (isActive ? activeStyle : {})}
          >
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
