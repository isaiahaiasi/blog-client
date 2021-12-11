import React, { useContext } from 'react';
import UserContext from '../contexts/user';
import type { ChildrenProps } from '../interfaces/propsInterfaces';
import { isLoggedIn } from '../utils/authHelpers';
import { testUser } from '../__fixtures__/APIData';

interface HeaderProps extends ChildrenProps {}

export default function Header({ children }: HeaderProps) {
  const [user, setUser] = useContext(UserContext);

  function toggleUserStatus() {
    setUser(isLoggedIn([user, setUser]) ? null : testUser);
  }

  return (
    <header>
      <p>Login status: {isLoggedIn([user]) ? 'Logged in' : 'Logged out'}</p>
      <div>
        <button onClick={toggleUserStatus}>
          Log {isLoggedIn([user]) ? 'out' : 'in'}?
        </button>
      </div>
      {children}
    </header>
  );
}
