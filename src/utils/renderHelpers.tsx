import React from 'react';
import type { APIError } from 'src/interfaces/APIDataInterfaces';
import ErrorDialog from '../components/ErrorDialog';

export default function renderErrors(err: any) {
  if (err?.errors) {
    const { errors } = err;
    return errors.map((error: APIError) => (
      <ErrorDialog key={error.msg} message={error.msg} />
    ));
  }
  if (err.toString() === '[object Object]') {
    return <ErrorDialog message="An error was encountered." />;
  }
  return <ErrorDialog message={err.toString()} />;
}
