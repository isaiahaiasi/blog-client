import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import fetchData from '../../utils/fetchData';
import { getUserAPIEndpoint } from '../../utils/routeGetters';
import ErrorDialog from '../ErrorDialog';

interface PasswordFormProps {
  onSubmit: (data: any) => void;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [user] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const mutation = useMutation(
    async (formData) =>
      await fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      }),
    {
      onSuccess: (data) => {
        console.log('update password state');
        onSubmit(data);
      },
    },
  );

  const onFormSubmit = (data: any) => mutation.mutate(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password', { required: true })} />
        {errors.password && (
          <ErrorDialog message={errors.password.toString()} />
        )}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          {...register('passwordConfirm', {
            required: true,
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
        />
        {errors.passwordConfirm && (
          <ErrorDialog message={errors.passwordConfirm.toString()} />
        )}
        <input type="submit" value="Update password" />
      </form>
      {mutation.isError && (
        <ErrorDialog message="An error was encountered. Password was not updated." />
      )}
    </div>
  );
}
