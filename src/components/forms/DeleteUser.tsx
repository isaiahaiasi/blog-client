import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import fetchData from '../../utils/fetchData';
import { renderErrors } from '../../utils/renderHelpers';
import { getUserAPIEndpoint } from '../../utils/routeGetters';

interface DeleteUserProps {
  onSubmit: (data: any) => void;
}

type DeleteUserFormFields = {
  password: string;
};

export default function DeleteUser({ onSubmit }: DeleteUserProps) {
  const [user, setUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation<any, unknown, DeleteUserFormFields, unknown>(
    async (formData) =>
      await fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
        credentials: 'include',
        method: 'DELETE',
        body: { username: user?.username ?? null, ...formData },
      }),
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        <button type="submit">PERMANENTLY DELETE ACCOUNT</button>
      </form>

      {mutation.isError && renderErrors(mutation.error)}
    </div>
  );
}
