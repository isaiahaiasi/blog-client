/* eslint-disable react/jsx-props-no-spreading */
import React, { HTMLInputTypeAttribute } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import ErrorDialog from './ErrorDialog';

export type FormFields<InputNames extends string> = {
  [key in InputNames]: string;
};

export interface InputData<InputNames extends string> {
  label: string;
  name: InputNames;
  type: HTMLInputTypeAttribute;
  validation?: Record<string, any>;
}

type FormFieldErrors<InputNames extends string> = {
  [key in InputNames]?: FieldError | undefined;
};

interface FormFieldProps<InputNames extends string> {
  inputData: InputData<InputNames>;
  register: UseFormRegister<FormFields<InputNames>>;
  errors: FormFieldErrors<InputNames>;
}

export default function FormField<InputNames extends string>({
  inputData: { label, name, type, validation },
  register,
  errors,
}: FormFieldProps<InputNames>) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        {...register(name as any, { required: true, ...validation })}
      />
      {errors[name] && (
        <ErrorDialog
          message={errors[name]?.message || 'This field is required'}
        />
      )}
    </div>
  );
}
