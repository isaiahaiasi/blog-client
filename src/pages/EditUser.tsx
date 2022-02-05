import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import DeleteUser from '../components/forms/DeleteUser';
import PasswordForm from '../components/forms/PasswordForm';
import UsernameForm from '../components/forms/UsernameForm';
import UserContext from '../contexts/user';

type ActiveFormNames = 'username' | 'password' | 'delete' | null;

type FormTemplateObject = {
  name: ActiveFormNames;
  text: string;
  form: React.ReactNode;
};

export default function EditUser() {
  const [user] = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

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
      form: <DeleteUser onSubmit={() => handleSubmit()} />,
    },
  ];

  return (
    <div>
      <h2>Edit Profile</h2>
      {forms.map((form) =>
        activeForm === form.name ? (
          <div key={form.name}>{form.form}</div>
        ) : (
          <button
            type="button"
            key={form.name}
            onClick={() => setActiveForm(form.name)}
          >
            {form.text}
          </button>
        ),
      )}
    </div>
  );
}
