import React, { HTMLInputTypeAttribute, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import UserContext from '../../contexts/user';
import { UNAUTHORIZED_RESPONSE } from '../../utils/authHelpers';
import ErrorDialog from '../ErrorDialog';
import FormFieldList from '../FormFieldList';

export interface InputData {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  validation?: Record<string, any>;
}

interface FormProps {
  inputDataList: InputData[];
  fetchFn(formData: any): any;
  mutationOptions: {
    onSuccess(data: any): void;
    onError?(data: unknown): void;
  };
  useFormOptions?: {
    defaultValues?: any;
    resolver?: any; // not sure how to type this
  };
  formName: string;
}

export default function Form({
  inputDataList,
  fetchFn,
  mutationOptions: { onSuccess, onError },
  useFormOptions = {},
  formName,
}: FormProps) {
  // needed to log the user out if an Unauthorized response is received
  const [, setUser] = useContext(UserContext);

  // define a type for an object whose keys are the form field names
  // (this is consumed by both the react-hook-form and react-query APIs)
  const formFieldNames = inputDataList.map((inputData) => inputData.name);
  type InputNames = typeof formFieldNames[number];
  type FormFields = {
    [key in InputNames]: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>(useFormOptions);

  const mutation = useMutation<any, unknown, FormFields, unknown>(
    async (formData) => fetchFn(formData),
    {
      onSuccess,
      onError: (data) => {
        if (data === UNAUTHORIZED_RESPONSE) {
          console.error('Session could not be verified. Logging out...');
          setUser(null);
        }
        if (onError) {
          onError(data);
        }
      },
    },
  );

  const onFormSubmit = (data: FormFields) => mutation.mutate(data);

  return (
    <div>
      <form
        name={formName}
        aria-label="form"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <FormFieldList
          inputDataList={inputDataList}
          register={register}
          errors={errors}
        />
        <input type="submit" value="Submit" />
      </form>
      {mutation.isError && (
        <ErrorDialog message="An error was encountered. Form was not submitted." />
      )}
    </div>
  );
}
