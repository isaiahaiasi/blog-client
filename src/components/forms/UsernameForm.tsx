import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { fetchPatchUser } from '../../utils/queryFns';
import { validateResponse } from '../../utils/responseValidator';
import ErrorDialog from '../ErrorDialog';

interface UsernameFormProps {
  onSubmit: (data: any) => void;
}

export interface UsernameFormFields {
  username: string;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [user, setUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormFields>({
    defaultValues: { username: user?.username },
  });

  const mutation = useMutation<any, unknown, UsernameFormFields, unknown>(
    async (formData) => await fetchPatchUser(user ?? null, formData),
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username'])) {
          updateUsername(data);
          onSubmit(data);
        }
      },
    },
  );

  function updateUsername(data: APIResponseBody) {
    const username = data?.content?.username;
    setUser((prevUser: any) => {
      return {
        ...prevUser,
        username: username ?? prevUser?.username,
      };
    });
  }

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
