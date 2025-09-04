import { signUp } from '@/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must be 100 characters or less'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'Please agree to the terms',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function useSignupForm(destination: string = '/') {
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
    reValidateMode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SignupFormValues, string>>
  >({});

  const onValid = async (values: SignupFormValues) => {
    setLoading(true);
    setError(undefined);
    setFieldErrors({});

    const result = await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
    });
    if (result.error) {
      setError(result.error.message);
    } else if (result.data) {
      router.push(destination);
      router.refresh();
    }
    setLoading(false);
  };

  const onInvalid: SubmitErrorHandler<SignupFormValues> = (errors) => {
    const fieldErrors = {
      name: errors.name?.message,
      email: errors.email?.message,
      password: errors.password?.message,
      confirmPassword: errors.confirmPassword?.message,
      agreeToTerms: errors.agreeToTerms?.message,
    };
    setFieldErrors(fieldErrors);
    setLoading(false);
  };

  const signup = form.handleSubmit(onValid, onInvalid);

  return { loading, error, signup, form, fieldErrors };
}
