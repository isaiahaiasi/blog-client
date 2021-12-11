import React, { useState } from 'react';
import PasswordForm from '../components/PasswordForm';
import UsernameForm from '../components/UsernameForm';

type ActiveForms = 'username' | 'password' | 'delete' | null;

export default function EditUser() {
  const [activeForm, setActiveForm] = useState<ActiveForms>(null);

  const handleSubmit = () => setActiveForm(null);

  const forms = [
    {
      name: 'username',
      text: 'Update username',
      form: <UsernameForm onSubmit={() => handleSubmit()} />,
    },
    {
      name: 'password',
      text: 'Update password',
      form: <PasswordForm onSubmit={() => handleSubmit()} />,
    },
    {
      name: 'delete',
      text: 'Delete User',
      form: <>TODO</>,
    },
  ];

  return (
    <div>
      <h2>Edit Profile</h2>
      {forms.map((form) => {
        return activeForm === form.name ? (
          form.form
        ) : (
          <button onClick={() => setActiveForm(form.name as ActiveForms)}>
            {form.text}
          </button>
        );
      })}
    </div>
  );
}
