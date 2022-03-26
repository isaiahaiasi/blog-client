import React, { useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { UNAUTHORIZED_RESPONSE } from '../../utils/authHelpers';
import { fetchPatchUser } from '../../utils/queryFns';
import ErrorDialog from '../ErrorDialog';
import type { FormFields, InputData } from '../FormField';
import FormField from '../FormField';

type PasswordFormFieldNames = 'password' | 'passwordConfirm';
export type PasswordFormFields = FormFields<PasswordFormFieldNames>;

interface PasswordFormProps {
  onSubmit: (data: any) => void;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [user, setUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormFields>();

  const password = useRef({});
  password.current = watch('password', '');

  const mutation = useMutation<any, unknown, PasswordFormFields, unknown>(
    async (formData) => fetchPatchUser(user ?? null, formData),
    {
      onSuccess: (data) => {
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

  const onFormSubmit = (data: PasswordFormFields) => mutation.mutate(data);

  const passwordInputsData: InputData<PasswordFormFieldNames>[] = [
    {
      label: 'Password',
      type: 'password',
      name: 'password',
    },
    {
      label: 'Confirm Password',
      type: 'password',
      name: 'passwordConfirm',
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {passwordInputsData.map((inputData) => (
          <FormField
            inputData={inputData}
            register={register}
            errors={errors}
          />
        ))}
        <input type="submit" value="Update password" />
      </form>
      {mutation.isError && (
        <ErrorDialog message="An error was encountered. Password was not updated." />
      )}
    </div>
  );
}
