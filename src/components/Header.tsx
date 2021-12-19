import React, { useContext } from 'react';
import UserContext from '../contexts/user';
import type { ChildrenProps } from '../interfaces/propsInterfaces';
import { isLoggedIn } from '../utils/authHelpers';

interface HeaderProps extends ChildrenProps {}

export default function Header({ children }: HeaderProps) {
  const [user] = useContext(UserContext);

  return (
    <header>
      {isLoggedIn([user]) && (
        <p>
          Logged in as: <b>{user?.username}</b>
        </p>
      )}
      {children}
    </header>
  );
}
