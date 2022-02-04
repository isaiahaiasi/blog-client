/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { fetchDeleteUser } from '../../utils/queryFns';
import { renderErrors } from '../../utils/renderHelpers';
import ErrorDialog from '../ErrorDialog';

interface DeleteUserProps {
  onSubmit: (data: any) => void;
}

export type DeleteUserFormFields = {
  password: string;
};

export default function DeleteUser({ onSubmit }: DeleteUserProps) {
  const [user, setUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteUserFormFields>();

  const mutation = useMutation<any, unknown, DeleteUserFormFields, unknown>(
    async (formData) => fetchDeleteUser(user ?? null, formData),
    {
      onSuccess: (data) => {
        setUser(null);
        onSubmit(data);
      },
    },
  );

  const onFormSubmit = (data: DeleteUserFormFields) => mutation.mutate(data);

  return (
    <div>
      <p>Are you sure? This action cannot be undone.</p>
      <p>Password is required to confirm account deletion.</p>
      <form
        name="delete-user-form"
        aria-label="form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <div>
          <label htmlFor="password">
            Password
            <input
              type="password"
              {...register('password', { required: true })}
            />
          </label>
        </div>
        <button type="submit">PERMANENTLY DELETE ACCOUNT</button>
      </form>

      {/* TODO: real error displaying */}
      { errors && <ErrorDialog message={errors.toString()} />}
      {mutation.isError && renderErrors(mutation.error)}
    </div>
  );
}
