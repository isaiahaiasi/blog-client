/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { fetchPatchUser } from '../../utils/queryFns';
import ErrorDialog from '../ErrorDialog';

interface PasswordFormProps {
  onSubmit: (data: any) => void;
}

export interface PasswordFormFields {
  password: string;
  passwordConfirm: string;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [user] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormFields>();

  const password = useRef({});
  password.current = watch('password', '');

  const mutation = useMutation<any, unknown, PasswordFormFields, unknown>(
    async (formData) => fetchPatchUser(user ?? null, formData),
    {
      onSuccess: (data) => {
        onSubmit(data);
      },
    },
  );

  const onFormSubmit = (data: PasswordFormFields) => mutation.mutate(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="password">
          Password
          <input type="password" {...register('password', { required: true })} />
        </label>
        {errors.password && (
          <ErrorDialog message={errors.password.toString()} />
        )}
        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            {...register('passwordConfirm', {
              required: true,
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
          />
        </label>
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
