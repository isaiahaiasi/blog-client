import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import React, { useContext } from 'react';
import type { InputData } from '../components/FormField';
import Form from '../components/forms/Form';
import UserContext from '../contexts/user';
import type {
  APIResponseBody,
  UserData,
} from '../interfaces/APIDataInterfaces';
import { fetchRegister } from '../utils/queryFns';
import validateResponse from '../utils/responseValidator';

type RegisterInputNames = 'username' | 'password' | 'passwordConfirm';

const registerFormSchema = Joi.object({
  username: Joi.string()
    .required()
    .min(4)
    .message('Username must be at least 4 characters long'),
  password: Joi.string().required().min(8).messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
  }),
  passwordConfirm: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
  }),
});

const validationOptions = { resolver: joiResolver(registerFormSchema) };

export default function RegisterUser() {
  const [, setUser] = useContext(UserContext);

  const updateUser = (data: APIResponseBody<UserData>) => {
    // TODO: replace with response validation via Joi
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

  const onSuccess = (data: any) => {
    if (validateResponse(data, ['username', '_id'])) {
      updateUser(data as APIResponseBody<UserData>);
    }
  };

  const inputs: InputData<RegisterInputNames>[] = [
    {
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Ripley',
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
    },
  ];

  return (
    <div className="main-content-container card">
      <h1>Register</h1>
      <Form
        inputDataList={inputs}
        fetchFn={fetchRegister}
        mutationOptions={{ onSuccess }}
        useFormOptions={validationOptions}
        formName="register-form"
      />
    </div>
  );
}
