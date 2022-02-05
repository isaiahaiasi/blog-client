/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import type { APIError } from 'src/interfaces/APIDataInterfaces';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import { fetchLogin } from '../utils/queryFns';
import renderErrors from '../utils/renderHelpers';
import validateResponse from '../utils/responseValidator';

export interface LoginFormFields {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [, setUser] = useContext(UserContext);
  const [badFetchResponse, setBadFetchResponse] = useState<APIError[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const mutation = useMutation<any, unknown, LoginFormFields, unknown>(
    async (formData) => fetchLogin(formData),
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

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => mutation.mutate(data);

  return (
    <div>
      <h1>Login</h1>
      <form
        name="login-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username">
          Username
          <input {...register('username', { required: true })} />
        </label>
        {errors.username && <ErrorDialog message="This field is required" />}

        <label htmlFor="password">
          password
          <input type="password" {...register('password', { required: true })} />
        </label>
        {errors.password && <ErrorDialog message="This field is required" />}

        <button type="submit">Log in</button>
      </form>
      {mutation.isLoading && <Loading />}
      {mutation.error && renderErrors(mutation.error)}
      {badFetchResponse
        && badFetchResponse.map((err) => <ErrorDialog message={err.msg} key={err.msg} />)}
    </div>
  );
}
