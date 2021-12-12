import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import fetchData from '../utils/fetchData';
import { validateResponse } from '../utils/responseValidator';
import { getLoginEndpoint } from '../utils/routeGetters';

type Inputs = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [, setUser] = useContext(UserContext);
  const [badFetchResponse, setBadFetchResponse] = useState<APIError[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const mutation = useMutation<any, unknown, Inputs, unknown>(
    async (formData) =>
      await fetchData(getLoginEndpoint(), {
        credentials: 'include',
        method: 'POST',
        body: formData,
      }),
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username', '_id'])) {
          setUser(data.content);
        } else {
          setBadFetchResponse(data.errors);
        }
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => mutation.mutate(data);

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
      {mutation.isLoading && <Loading />}
      {mutation.error && renderErrors(mutation.error)}
      {badFetchResponse &&
        badFetchResponse.map((err) => {
          return <ErrorDialog message={err.msg} key={err.msg} />;
        })}
    </div>
  );
}

function renderErrors(err: any) {
  if (err?.errors) {
    const { errors } = err;
    return errors.map((error: APIError) => {
      return <ErrorDialog key={error.msg} message={error.msg} />;
    });
  } else if (err.toString() === '[object Object]') {
    return <ErrorDialog message="An error was encountered." />;
  } else {
    return <ErrorDialog message={err.toString()} />;
  }
}
