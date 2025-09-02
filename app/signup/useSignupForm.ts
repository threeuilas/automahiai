import { signUp } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be 100 characters or less'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'Please agree to the terms',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export function useSignupForm() {
  const router = useRouter();
  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignupFormValues, string>>>({});

  const signup = useCallback(
    form.handleSubmit(async (values) => {
      setLoading(true);
      setError(undefined);
      setFieldErrors({});
      // Zod validation
      const parsed = SignupSchema.safeParse(values);
      if (!parsed.success) {
        const errors: Partial<Record<keyof SignupFormValues, string>> = {};
        parsed.error.issues.forEach((issue) => {
          const key = issue.path[0] as keyof SignupFormValues;
          errors[key] = issue.message;
        });
        setFieldErrors(errors);
        setLoading(false);
        return;
      }
      // TODO: Call your signup API
      const result = await signUp.email({
          email: form.getValues('email'), password: form.getValues('password'),
          name: form.getValues('name'),
      });
              if (result.error) {
            setError(result.error?.message);
        } else if (result.data) {
            router.push('/');
        }
        setLoading(false);
    }),
    [form, router],
  );

  return { loading, error, signup, form, fieldErrors };
}
