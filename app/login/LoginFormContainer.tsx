'use client';
import * as React from 'react';
import { LoginForm } from './LoginForm';
import { z } from 'zod';
import { useForm } from 'react-hook-form';


export function LoginFormContainer() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  const form = useForm({
    defaultValues: { email: '', password: '', remember: false },
  });

  return (
    <LoginForm
      loading={loading}
      error={error}
      form={form}
      onSubmit={handleSubmit}
    />
  );
}
