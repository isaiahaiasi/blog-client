import React from 'react';
import ErrorDialog from '../components/ErrorDialog';

export function renderErrors(err: any) {
  if (err?.errors) {
    const { errors } = err;
    return errors.map((error: APIError) => {
      return <ErrorDialog key={error.msg} message={error.msg} />;
    });
  } else if (err.toString() === '[object Object]') {
    return <ErrorDialog message="An error was encountered." />;
  } else {
    return <ErrorDialog message={err.toString()} />;
  }
}
