import React, { useState } from 'react';
import PasswordForm from '../components/forms/PasswordForm';
import UsernameForm from '../components/forms/UsernameForm';

type ActiveFormNames = 'username' | 'password' | 'delete' | null;

type FormTemplateObject = {
  name: ActiveFormNames;
  text: string;
  form: React.ReactNode;
};

export default function EditUser() {
  const [activeForm, setActiveForm] = useState<ActiveFormNames>(null);

  const handleSubmit = () => setActiveForm(null);

  const forms: FormTemplateObject[] = [
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
          <div key={form.name}>{form.form}</div>
        ) : (
          <button key={form.name} onClick={() => setActiveForm(form.name)}>
            {form.text}
          </button>
        );
      })}
    </div>
  );
}
