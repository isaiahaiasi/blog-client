import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user';
import isLoggedIn from '../utils/authHelpers';

function Nav() {
  const userContext = useContext(UserContext);

  // TEMP
  const activeStyle = {
    textDecoration: 'underline',
  };

  function getNavList() {
    return isLoggedIn(userContext)
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
