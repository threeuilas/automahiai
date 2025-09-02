"use client";
import * as React from 'react';
import { SignupForm } from './SignupForm';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const SignupSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  name: z.string().min(2).max(100),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6),
  agreeToTerms: z.literal(true, { message: 'You must agree to the terms.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export function SignupFormContainer() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const handleSubmit = async (values: any) => {
    setError(undefined);
    const parsed = SignupSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || 'Validation error');
      return;
    }
    setLoading(true);
    try {
      // Replace with your betterauth signup logic
      // await betterauth.signup(parsed.data)
      setTimeout(() => {
        setLoading(false);
        router.push('/login');
      }, 1000);
    } catch (e: any) {
      setError('Signup failed.');
      setLoading(false);
    }
  };

  return (
    <SignupForm
      loading={loading}
      error={error}
      form={form}
      onSubmit={handleSubmit}
    />
  );
}
