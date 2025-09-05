import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitErrorHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFarm } from '@/lib/db/data/farms';

const farmSchema = z.object({
  name: z
    .string()
    .min(1, 'Farm name is required')
    .max(100, 'Farm name must be less than 100 characters'),
});

type FarmFormValues = z.infer<typeof farmSchema>;

export function useFarmForm(userId: string) {
  const router = useRouter();
  const form = useForm<FarmFormValues>({
    defaultValues: { name: '' },
    resolver: zodResolver(farmSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async () => {
    setLoading(true);
    setError(undefined);

    fetch('/api/farm', {
      method: 'POST',
      body: JSON.stringify({ name: form.getValues('name') }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to create farm');
        }
        router.push('/farm');
        router.refresh();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onInvalid: SubmitErrorHandler<FarmFormValues> = (errors) => {
    setError(errors.name?.message);
    setLoading(false);
  };

  const createFarmHandler = form.handleSubmit(onValid, onInvalid);

  return { loading, error, createFarmHandler, form };
}
