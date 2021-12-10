import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import useFetch from '../hooks/useFetch';
import { validateResponse } from '../utils/responseValidator';
import { getLoginEndpoint } from '../utils/routeGetters';

type Inputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    fetchState,
    error: fetchError,
    doFetch,
  } = useFetch(getLoginEndpoint(), {
    credentials: 'include',
    method: 'POST',
  });

  const [, setUser] = useContext(UserContext);
  const [negativeFetchResponse, setNegativeFetchResponse] = useState();

  // fetch state changes when resolved
  useEffect(() => {
    if (fetchState?.value) {
      if (validateResponse(fetchState.value, ['username', '_id'])) {
        setUser(fetchState.value.body.content);
        // TODO: Redirect? (as fallback, userState determines primary routing)
      } else {
        setNegativeFetchResponse(fetchState?.value.body.errors);
      }
    }
  }, [fetchState]);

  const onSubmit: SubmitHandler<Inputs> = (data) => doFetch({ body: data });

  return (
    <div>
      <h1>Login</h1>
      <form
        name="login-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username">username</label>
        <input {...register('username', { required: true })} />
        {errors.username && <ErrorDialog message="This field is required" />}

        <label htmlFor="password">password</label>
        <input type="password" {...register('password', { required: true })} />
        {errors.password && <ErrorDialog message="This field is required" />}

        <button type="submit">Log in</button>
      </form>
      {fetchState?.loading && <Loading />}
      {fetchError && <ErrorDialog message={(fetchError as any).toString()} />}
      {negativeFetchResponse &&
        (negativeFetchResponse as APIError[]).map((err) => {
          return <ErrorDialog message={err.msg} key={err.msg} />;
        })}
    </div>
  );
}
