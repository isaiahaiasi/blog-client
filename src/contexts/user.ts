import React, { createContext } from 'react';
import type { UserData } from 'src/interfaces/APIDataInterfaces';

type UserContextValue = [
  UserData | null,
  React.Dispatch<React.SetStateAction<UserData | null>> | (() => void),
];
const UserContext = createContext<UserContextValue>([
  null,
  () =>
    console.error(
      'Could not update User state because Context was not provided!',
    ),
]);

export default UserContext;
