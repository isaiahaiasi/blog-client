import React from 'react';
import type { UseFormRegister } from 'react-hook-form';
import type { FormFieldErrors, FormFields, InputData } from './FormField';
import FormField from './FormField';

interface FormFieldListProps<InputNames extends string> {
  inputDataList: InputData<InputNames>[];
  register: UseFormRegister<FormFields<InputNames>>;
  errors: FormFieldErrors<InputNames>;
}

export default function FormFieldList<InputNames extends string>({
  inputDataList,
  register,
  errors,
}: FormFieldListProps<InputNames>) {
  return (
    <>
      {inputDataList.map((inputData) => (
        <FormField inputData={inputData} register={register} errors={errors} />
      ))}
    </>
  );
}
