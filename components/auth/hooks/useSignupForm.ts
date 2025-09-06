import { signUp } from '@/lib/auth/client';
import { SignupFormValues, SignupSchema } from '@/lib/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    resolver: zodResolver(SignupSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async (values: SignupFormValues) => {
    setLoading(true);
    setError(undefined);

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
  const signup = form.handleSubmit(onValid);

  return { loading, error, signup, form };
}
