import React from 'react';
import '../../styles/form.css';

interface FormInputErrorProps {
  message: string;
}

export default function FormInputError({ message }: FormInputErrorProps) {
  return <div className="form-item__error">{message}</div>;
}
