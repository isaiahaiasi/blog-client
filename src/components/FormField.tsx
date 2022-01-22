import React, { HTMLInputTypeAttribute } from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import '../styles/form.css';
import FormInputError from './forms/FormInputError';

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
    <div className={errors[name] ? 'form-item form--error' : 'form-item'}>
      <label className="form-item__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-item__input"
        type={type}
        {...register(name as any, { required: true, ...validation })}
      />
      {errors[name] && (
        <FormInputError
          message={errors[name]?.message || 'This field is required'}
        />
      )}
    </div>
  );
}
