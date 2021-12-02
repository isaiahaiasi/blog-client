import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import useFetch from '../hooks/useFetch';
import { validateResponse } from '../utils/responseValidator';
import { getLoginEndpoint } from '../utils/routeGetters';

export default function Login() {
  const [formValues, setFormValues] = useState({ username: '', password: '' });

  const [, setUser] = useContext(UserContext);

  const { fetchState, error, doFetch } = useFetch(getLoginEndpoint(), {
    credentials: 'include',
    method: 'POST',
    body: formValues,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doFetch();
  };

  useEffect(() => {
    if (
      fetchState?.value &&
      validateResponse(fetchState.value, ['username', '_id'])
    ) {
      setUser(fetchState.value.body.content);
      // TODO: redirect?
    }
  }, [fetchState]);

  return (
    <div>
      <h2>Login</h2>
      <form name="login form" aria-label="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleInput}
          value={formValues.username}
        />
        <input
          type="password"
          name="password"
          onChange={handleInput}
          value={formValues.password}
        />
        <button type="submit">Log in</button>
      </form>
      {fetchState?.loading && <Loading />}
      {error && <ErrorDialog message={(error as any).toString()} />}
      {/* TODO: render errors from valid response */}
    </div>
  );
}
