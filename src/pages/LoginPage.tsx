import React, { useContext, useState } from 'react';
import type { APIError } from 'src/interfaces/APIDataInterfaces';
import ErrorDialog from '../components/ErrorDialog';
import type { FormFields, InputData } from '../components/FormField';
import Form from '../components/forms/Form';
import UserContext from '../contexts/user';
import { fetchLogin } from '../utils/queryFns';
import validateResponse from '../utils/responseValidator';

type LoginFormFieldNames = 'username' | 'password';
export type LoginFormFields = FormFields<LoginFormFieldNames>;

export default function LoginPage() {
  const inputsDataList: InputData<LoginFormFieldNames>[] = [
    {
      type: 'text',
      name: 'username',
      label: 'Username',
      placeholder: 'Bobby McGee',
    },
    {
      type: 'password',
      name: 'password',
      label: 'Password',
    },
  ];

  const [, setUser] = useContext(UserContext);
  const [badFetchResponse, setBadFetchResponse] = useState<APIError[]>();

  const fetchFn = fetchLogin;
  const onSuccess = (data: any) => {
    if (validateResponse(data, ['username', '_id'])) {
      setUser(data.content);
    } else {
      setBadFetchResponse(data.errors);
    }
  };

  return (
    <div className="main-content-container card">
      <h1>Login</h1>
      <Form
        formName="login-form"
        inputDataList={inputsDataList}
        fetchFn={fetchFn}
        mutationOptions={{ onSuccess }}
      />
      {badFetchResponse &&
        badFetchResponse.map((err) => (
          <ErrorDialog message={err.msg} key={err.msg} />
        ))}
    </div>
  );
}
