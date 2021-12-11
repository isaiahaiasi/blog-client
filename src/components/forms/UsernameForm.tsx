import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import fetchData from '../../utils/fetchData';
import { validateResponse } from '../../utils/responseValidator';
import { getUserAPIEndpoint } from '../../utils/routeGetters';
import ErrorDialog from '../ErrorDialog';

interface UsernameFormProps {
  onSubmit: () => void;
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
          console.log('update username state');
          setUser((prevUser: any) => {
            const username = (data as APIResponseBody)?.content?.username;
            console.log(data);
            console.log(username);
            return {
              username: username ?? prevUser?.username,
              ...prevUser,
            };
          });

          onSubmit();
        }
      },
    },
  );

  const onFormSubmit = (data: UsernameFormFields) => mutation.mutate(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username', { required: true })} />
        {errors.username && (
          <ErrorDialog message={errors.username.toString()} />
        )}
        <input type="submit" value="Update username" />
      </form>
      {mutation.isSuccess && 'Username updated successfully'}
    </div>
  );
}
