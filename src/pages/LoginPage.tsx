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
          // TODO: Redirect? (as fallback, userState determines primary routing)
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
      {mutation.error && (
        <ErrorDialog message={(mutation.error as any).toString()} />
      )}
      {badFetchResponse &&
        badFetchResponse.map((err) => {
          return <ErrorDialog message={err.msg} key={err.msg} />;
        })}
    </div>
  );
}
