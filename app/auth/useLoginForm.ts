import { signIn } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(100),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function useLoginForm(destination: string = '/') {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '', remember: false },
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async () => {
    setLoading(true);
    setError(undefined);

    const result = await signIn.email({
      email: form.getValues('email'),
      password: form.getValues('password'),
    });
    if (result.error) {
      setError(result.error?.message);
    } else if (result.data) {
      router.push(destination);
    }
    setLoading(false);
  };

  const onInvalid: SubmitErrorHandler<LoginFormValues> = (errors) => {
    setError(errors.email?.message || errors.password?.message);
    setLoading(false);
  };

  const login = form.handleSubmit(onValid, onInvalid);

  return { loading, error, login, form };
}
