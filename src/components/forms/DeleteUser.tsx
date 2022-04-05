import React, { useContext } from 'react';
import UserContext from '../../contexts/user';
import { fetchDeleteUser } from '../../utils/queryFns';
import type { InputData } from './Form';
import Form from './Form';

interface DeleteUserProps {
  onSubmit: (data: any) => void;
}

export default function DeleteUser({ onSubmit }: DeleteUserProps) {
  const [user, setUser] = useContext(UserContext);

  const fetchFn = (formData: any) => {
    fetchDeleteUser(user ?? null, formData);
  };

  const onSuccess = (data: any) => {
    setUser(null);
    onSubmit(data);
  };

  const inputData: InputData = {
    type: 'password',
    name: 'password',
    label: 'Password',
  };

  return (
    <div>
      <p className="text-warn">Are you sure? This action cannot be undone.</p>
      <p className="text-warn">
        Password is required to confirm account deletion.
      </p>
      <Form
        formName="delete-user-form"
        inputDataList={[inputData]}
        fetchFn={fetchFn}
        mutationOptions={{ onSuccess }}
      />
    </div>
  );
}
