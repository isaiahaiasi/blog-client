import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import fetchData from '../../utils/fetchData';
import { validateResponse } from '../../utils/responseValidator';
import { getUserAPIEndpoint } from '../../utils/routeGetters';
import ErrorDialog from '../ErrorDialog';

interface UsernameFormProps {
  onSubmit: (data: any) => void;
}

interface UsernameFormFields {
  username: string;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [user, setUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: user?.username } });

  const mutation = useMutation<any, unknown, UsernameFormFields, unknown>(
    async (formData) =>
      await fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      }),
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username'])) {
          // TODO: fix typing
          setUser((prevUser: any) => {
            const username = (data as APIResponseBody)?.content?.username;
            return {
              ...prevUser,
              username: username ?? prevUser?.username,
            };
          });

          onSubmit(data);
        }
      },
    },
  );

  const onFormSubmit = (data: UsernameFormFields) => mutation.mutate(data);

  return (
    <div>
      <form
        name="username-form"
        aria-label="form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username', { required: true })} />
        {errors.username && (
          <ErrorDialog message={errors.username.toString()} />
        )}
        <input type="submit" value="Update username" />
      </form>
      {mutation.isError && (
        <ErrorDialog message="An error was encountered. Username was not updated." />
      )}
    </div>
  );
}
