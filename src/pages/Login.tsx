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

  const [user, setUser] = useContext(UserContext);

  const [fetchTrigger, setFetchTrigger] = useState(false);
  const { isLoading, response, error, callFetch } = useFetch(
    getLoginEndpoint(),
    { current: fetchTrigger },
    { credentials: 'include' },
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchTrigger(true);
    callFetch({ method: 'POST', body: formValues });
  };

  useEffect(() => {
    if (response && validateResponse(response, ['username', '_id'])) {
      setUser((response.body as any).content);
      // TODO: redirect?
    }
    setFetchTrigger(false);
  }, [response]);

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
      {isLoading && <Loading />}
      {error && <ErrorDialog message={(error as any).message} />}
      {/* TODO: render errors from valid response */}
    </div>
  );
}
