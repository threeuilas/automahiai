import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signIn } from '@/lib/auth/client';
import { LoginFormValues, LoginSchema } from '@/lib/schema/auth';

export function useLoginForm(destination: string = '/') {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', remember: false },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async () => {
    setLoading(true);
    setError(undefined);

    const result = await signIn.email({
      email: form.getValues('email'),
      password: form.getValues('password'),
      rememberMe: form.getValues('remember'),
    });
    if (result.error) {
      setError(result.error?.message);
    } else if (result.data) {
      router.push(destination);
      router.refresh();
    }
    setLoading(false);
  };

  const login = form.handleSubmit(onValid);

  return { loading, error, login, form };
}
