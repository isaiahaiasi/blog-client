import React, { useContext, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import type {
  APIResponseBody,
  UserData,
} from '../interfaces/APIDataInterfaces';
import type { FormFields, InputData } from '../components/FormField';
import FormField from '../components/FormField';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import { fetchRegister } from '../utils/queryFns';
import renderErrors from '../utils/renderHelpers';
import validateResponse from '../utils/responseValidator';

type RegisterInputNames = 'username' | 'password' | 'passwordConfirm';
export type RegisterFormFields = FormFields<RegisterInputNames>;

export default function RegisterUser() {
  const [, setUser] = useContext(UserContext);

  const updateUser = (data: APIResponseBody<UserData>) => {
    if (data?.content?.username && data.content._id) {
      setUser(() => {
        const { username, _id } = data.content;
        return {
          username,
          _id,
        };
      });
    } else {
      console.error('Malformed API response', data);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormFields>();

  const mutation = useMutation<any, unknown, RegisterFormFields, unknown>(
    async (formData) => fetchRegister(formData),
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username', '_id'])) {
          updateUser(data as APIResponseBody<UserData>);

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onSubmit(data);
        }
      },
    },
  );

  const onSubmit: SubmitHandler<RegisterFormFields> = (data) =>
    mutation.mutate(data);

  const password = useRef({});
  password.current = watch('password', '');

  const inputs: InputData<RegisterInputNames>[] = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
    },
    {
      label: 'Confirm Password',
      name: 'passwordConfirm',
      type: 'password',
      validation: {
        validate: (value: string) =>
          value === password.current || 'The passwords do not match',
      },
    },
  ];

  return (
    <div className="main-content-container card">
      <h1>Register</h1>
      <form
        name="register-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map((inputData) => (
          <FormField
            key={inputData.name}
            inputData={inputData}
            register={register}
            errors={errors}
          />
        ))}

        <button type="submit">Log in</button>
      </form>
      {mutation.isLoading && <Loading />}
      {mutation.error && renderErrors(mutation.error)}
    </div>
  );
}
