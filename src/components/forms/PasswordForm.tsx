import React, { useContext } from 'react';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import UserContext from '../../contexts/user';
import { fetchPatchUser } from '../../utils/queryFns';
import type { FormFields, InputData } from '../FormField';
import Form from './Form';

type PasswordFormFieldNames = 'password' | 'passwordConfirm';
export type PasswordFormFields = FormFields<PasswordFormFieldNames>;

const passwordFormSchema = Joi.object({
  password: Joi.string().required().min(8).messages({
    'string.empty': 'Password cannot be empty',
    'string.min': 'Password must be at least 8 characters long',
  }),
  passwordConfirm: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords must match',
  }),
});

const validationOptions = { resolver: joiResolver(passwordFormSchema) };

interface PasswordFormProps {
  onSubmit: (data: any) => void;
}

export default function PasswordForm({ onSubmit }: PasswordFormProps) {
  const [user] = useContext(UserContext);

  const fetchFn = (formData: any) => fetchPatchUser(user ?? null, formData);
  const onSuccess = onSubmit;

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
      <h3>Update Password</h3>
      <Form
        formName="password-change-form"
        inputDataList={passwordInputsData}
        useFormOptions={validationOptions}
        fetchFn={fetchFn}
        mutationOptions={{ onSuccess }}
      />
    </div>
  );
}
