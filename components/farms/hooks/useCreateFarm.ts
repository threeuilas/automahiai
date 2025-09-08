import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateFarmRequest,
  createFarmResponseSchema,
  createFarmRequestSchema,
} from '@/lib/api/farms';

export function useCreateFarm() {
  const router = useRouter();
  const form = useForm({
    defaultValues: { name: '', description: '' },
    resolver: zodResolver(createFarmRequestSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async (formValues: CreateFarmRequest) => {
    setLoading(true);
    setError(undefined);

    try {
      const res = await fetch('/api/farms', {
        method: 'POST',
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        throw new Error('Failed to create farm');
      }
      const response = createFarmResponseSchema.safeParse(await res.json());
      if (!response.success) {
        throw new Error('Invalid response from server');
      } else if (!response.data.success) {
        throw new Error(response.data.error);
      }
      router.push(`/farms/${response.data.id}`);
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
