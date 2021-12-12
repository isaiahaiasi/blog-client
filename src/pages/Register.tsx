import React, { HTMLInputTypeAttribute, useContext, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import ErrorDialog from '../components/ErrorDialog';
import Loading from '../components/Loading';
import UserContext from '../contexts/user';
import fetchData from '../utils/fetchData';
import { renderErrors } from '../utils/renderHelpers';
import { validateResponse } from '../utils/responseValidator';
import { getRegisterEndpoint } from '../utils/routeGetters';

type InputName = 'username' | 'password' | 'passwordConfirm';

type InputGroup = {
  [key in InputName]: string;
};

type Input = {
  label: string;
  name: InputName;
  type: HTMLInputTypeAttribute;
  validation?: Record<string, any>;
};

export default function RegisterUser() {
  const [, setUser] = useContext(UserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputGroup>();

  const mutation = useMutation<any, unknown, InputGroup, unknown>(
    async (formData) => {
      return await fetchData(getRegisterEndpoint(), {
        method: 'POST',
        body: formData,
      });
    },
    {
      onSuccess: (data) => {
        if (validateResponse(data, ['username', '_id'])) {
          console.log('validation passed');
          // TODO: fix typing
          setUser(() => {
            const { username, _id } = (data as APIResponseBody)?.content;
            return {
              username,
              _id,
            };
          });
          onSubmit(data);
        }
        console.log('outside validation');
      },
    },
  );

  const onSubmit: SubmitHandler<InputGroup> = (data) => mutation.mutate(data);

  const password = useRef({});
  password.current = watch('password', '');

  const inputs: Input[] = [
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
    <div>
      <h1>Register</h1>
      <form
        name="register-form"
        aria-label="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {inputs.map(({ label, name, type, validation }) => (
          <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              {...register(name, { required: true, ...validation })}
            />
            {errors.username && (
              <ErrorDialog message="This field is required" />
            )}
          </div>
        ))}

        <button type="submit">Log in</button>
      </form>
      {mutation.isLoading && <Loading />}
      {mutation.error && renderErrors(mutation.error)}
    </div>
  );
}
