import React, { useContext } from 'react';
import type {
  APIResponseBody,
  UserData,
} from 'src/interfaces/APIDataInterfaces';
import UserContext from '../../contexts/user';
import { fetchPatchUser } from '../../utils/queryFns';
import validateResponse from '../../utils/responseValidator';
import Form from './Form';

interface UsernameFormProps {
  onSubmit: (data: any) => void;
}

export default function UsernameForm({ onSubmit }: UsernameFormProps) {
  const inputData = {
    label: 'Username',
    type: 'text',
    name: 'username',
  };

  const [user, setUser] = useContext(UserContext);

  function updateUsernameFrontend(data: APIResponseBody<UserData>) {
    const username = data?.content?.username;
    setUser((prevUser: any) => ({
      ...prevUser,
      username: username ?? prevUser?.username,
    }));
  }

  const useFormOptions = { defaultValues: { username: user?.username } };

  const fetchFn = (formData: any) => fetchPatchUser(user ?? null, formData);

  const onSuccess = (data: any) => {
    if (validateResponse(data, ['username'])) {
      updateUsernameFrontend(data);
      onSubmit(data);
    }
  };

  return (
    <Form
      formName="username-form"
      inputDataList={[inputData]}
      useFormOptions={useFormOptions}
      mutationOptions={{ onSuccess }}
      fetchFn={fetchFn}
    />
  );
}
