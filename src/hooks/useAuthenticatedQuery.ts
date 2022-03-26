// A minimal wrapper for react-query's useQuery hook.
// Checks if returned query data indicates that user does not have a valid session,
// and if so "logs user out" (sets userState)

import { useContext } from 'react';
import { QueryFunction, useQuery } from 'react-query';
import { UNAUTHORIZED_RESPONSE } from '../utils/authHelpers';
import UserContext from '../contexts/user';

function isUnauthorizedResponse(res: any) {
  return res === UNAUTHORIZED_RESPONSE;
}

export default function useAuthenticatedQuery<T>(
  key: string,
  queryFn: QueryFunction,
) {
  const [, setUser] = useContext(UserContext);

  return useQuery<unknown, any, T>(key, queryFn, {
    onError: (data) => {
      if (isUnauthorizedResponse(data)) {
        console.error('Session could not be verified. Logging out...');
        setUser(null);
      }
    },
  });
}
