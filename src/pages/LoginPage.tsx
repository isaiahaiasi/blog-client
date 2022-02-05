import React, { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import type { APIError } from 'src/interfaces/APIDataInterfaces';
import ErrorDialog from '../components/ErrorDialog';
import type { FormFields, InputData } from '../components/FormField';
import FormField from '../components/FormField';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import { fetchLogin } from '../utils/queryFns';
import renderErrors from '../utils/renderHelpers';
import validateResponse from '../utils/responseValidator';

type LoginFormFieldNames = 'username' | 'password';
export type LoginFormFields = FormFields<LoginFormFieldNames>;

export default function LoginPage() {
  const [, setUser] = useContext(UserContext);
  const [badFetchResponse, setBadFetchResponse] = useState<APIError[]>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  const mutation = useMutation<any, unknown, LoginFormFields, unknown>(
    async (formData) => fetchLogin(formData),
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username', '_id'])) {
          setUser(data.content);
        } else {
          setBadFetchResponse(data.errors);
        }
      },
    },
  );

  const onSubmit: SubmitHandler<LoginFormFields> = (data) =>
    mutation.mutate(data);

  const formInputsData: InputData<LoginFormFieldNames>[] = [
    {
      type: 'text',
      name: 'username',
      label: 'Username',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
    },
  ];

  return (
    <div>
      <h1>Login</h1>
      <form
        name="login-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formInputsData.map((inputData) => (
          <FormField
            inputData={inputData}
            register={register}
            errors={errors}
          />
        ))}

        <button type="submit">Log in</button>
      </form>
      {mutation.isLoading && <Loading />}
      {mutation.error && renderErrors(mutation.error)}
      {badFetchResponse &&
        badFetchResponse.map((err) => (
          <ErrorDialog message={err.msg} key={err.msg} />
        ))}
    </div>
  );
}
