import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateFarmRequest, createFarmSchema } from '@/lib/api/farm/schema';

export function useCreateFarm() {
  const router = useRouter();
  const form = useForm<CreateFarmRequest>({
    defaultValues: { name: '' },
    resolver: zodResolver(createFarmSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async (formValues: CreateFarmRequest) => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch('/api/farm', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        throw new Error('Failed to create farm');
      }

      router.push('/farm');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createFarmHandler = form.handleSubmit(onValid);

  return { loading, error, createFarmHandler, form };
}
