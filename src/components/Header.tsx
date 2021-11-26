import React, { useContext } from 'react';
import UserContext from '../contexts/user';
import type { ChildrenProps } from '../interfaces/propsInterfaces';

interface HeaderProps extends ChildrenProps {}

export default function Header({ children }: HeaderProps) {
  const [user, setUser] = useContext(UserContext);

  function toggleUserStatus() {
    setUser(user === null ? true : null);
  }

  return (
    <header>
      <p>Login status: {user ? 'Logged in' : 'Logged out'}</p>
      <div>
        <button onClick={toggleUserStatus}>
          Log {user === null ? 'in' : 'out'}?
        </button>
      </div>
      {children}
    </header>
  );
}
