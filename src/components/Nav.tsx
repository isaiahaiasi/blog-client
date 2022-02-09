import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user';
import isLoggedIn from '../utils/authHelpers';

function Nav() {
  const userContext = useContext(UserContext);

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
          <li>
            <NavLink
              key={link}
              to={link}
              className={({ isActive }) =>
                isActive ? 'nav__item nav__item--active' : 'nav__item'
              }
            >
              {text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
