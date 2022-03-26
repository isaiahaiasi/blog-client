import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { UNAUTHORIZED_RESPONSE } from '../../utils/authHelpers';
import { fetchDeleteUser } from '../../utils/queryFns';
import renderErrors from '../../utils/renderHelpers';
import type { FormFields, InputData } from '../FormField';
import FormField from '../FormField';

type DeleteUserFieldNames = 'password';
export type DeleteUserFormFields = FormFields<DeleteUserFieldNames>;

interface DeleteUserProps {
  onSubmit: (data: any) => void;
}

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
      onError: (data) => {
        if (data === UNAUTHORIZED_RESPONSE) {
          console.error('Session could not be verified. Logging out...');
          setUser(null);
        }
      },
    },
  );

  const onFormSubmit = (data: DeleteUserFormFields) => mutation.mutate(data);

  const inputData: InputData<DeleteUserFieldNames> = {
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
      <form
        name="delete-user-form"
        aria-label="form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <FormField inputData={inputData} register={register} errors={errors} />
        <button type="submit">PERMANENTLY DELETE ACCOUNT</button>
      </form>

      {mutation.isError && renderErrors(mutation.error)}
    </div>
  );
}
