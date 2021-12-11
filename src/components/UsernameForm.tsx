import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import UserContext from '../contexts/user';

interface UsernameFormProps {
  onSubmit: () => void;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const [user] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: user?.username } });

  const onFormSubmit = (data: any) => {
    // TODO: useMutation
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="username">Username</label>
        <input type="text" {...register('username', { required: true })} />
        <input type="submit" value="Update username" />
      </form>
    </div>
  );
}
