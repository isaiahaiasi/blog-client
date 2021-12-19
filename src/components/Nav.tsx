import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../contexts/user';
import { isLoggedIn } from '../utils/authHelpers';
import styles from '../styles/Nav.module.css';

interface NavProps {}

function Nav({}: NavProps) {
  console.log(styles);
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
      <ul className={styles.nav}>
        {getNavList().map(([text, link]) => (
          <NavLink
            key={link}
            to={link}
            className={({ isActive }) =>
              isActive ? styles['nav-item-active'] : ''
            }
          >
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
