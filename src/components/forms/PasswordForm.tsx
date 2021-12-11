import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../../contexts/user';
import ErrorDialog from '../ErrorDialog';

interface PasswordFormProps {
  onSubmit: () => void;
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

  const onFormSubmit = (data: any) => {
    // TODO: useMutation
    // after that returns...
    onSubmit();
  };

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
    </div>
  );
}
