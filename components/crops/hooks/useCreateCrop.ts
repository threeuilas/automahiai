import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

import {
  CreateCropRequest,
  createCropResponseSchema,
} from '@/lib/schema/crops';

const formSchema = z.object({
  name: z.string().min(1, 'Crop name is required'),
  type: z.enum(['continuous_harvest', 'harvest_once']),
  daysToMaturity: z.number().min(1, 'Days to maturity must be at least 1'),
  quantityPerHarvest: z
    .number()
    .min(1, 'Quantity per harvest must be at least 1'),
  quantityUnit: z.enum(['kg', 'g', 'lb', 'oz', 'count']),
  seedVendor: z.string().min(1, 'Seed vendor is required'),
  seedsPerLinearFeet: z
    .number()
    .min(1, 'Seeds per linear feet must be at least 1'),
  plantsPerLinearFeet: z
    .number()
    .min(1, 'Plants per linear feet must be at least 1'),
  daysBetweenHarvests: z.number().optional(),
});

export function useCreateCrop() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: '',
      type: 'harvest_once' as const,
      daysToMaturity: 0,
      quantityPerHarvest: 0,
      quantityUnit: 'kg' as const,
      seedVendor: '',
      seedsPerLinearFeet: 0,
      plantsPerLinearFeet: 0,
      daysBetweenHarvests: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const onValid = async (formValues: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(undefined);

    try {
      // Transform form values to match the API schema
      const attributes =
        formValues.type === 'continuous_harvest'
          ? {
              type: 'continuous_harvest' as const,
              daysToMaturity: formValues.daysToMaturity,
              quantityPerHarvest: formValues.quantityPerHarvest,
              quantityUnit: formValues.quantityUnit,
              seedVendor: formValues.seedVendor,
              seedsPerLinearFeet: formValues.seedsPerLinearFeet,
              plantsPerLinearFeet: formValues.plantsPerLinearFeet,
              daysBetweenHarvests: formValues.daysBetweenHarvests || 0,
            }
          : {
              type: 'harvest_once' as const,
              daysToMaturity: formValues.daysToMaturity,
              quantityPerHarvest: formValues.quantityPerHarvest,
              quantityUnit: formValues.quantityUnit,
              seedVendor: formValues.seedVendor,
              seedsPerLinearFeet: formValues.seedsPerLinearFeet,
              plantsPerLinearFeet: formValues.plantsPerLinearFeet,
            };

      const requestData: CreateCropRequest = {
        name: formValues.name,
        attributes,
      };

      const res = await fetch('/api/crops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!res.ok) {
        throw new Error('Failed to create crop');
      }
      const response = createCropResponseSchema.safeParse(await res.json());
      if (!response.success) {
        throw new Error('Invalid response from server');
      } else if (!response.data.success) {
        throw new Error(response.data.error);
      }
      router.push(`/crops`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createCropHandler = form.handleSubmit(onValid);

  return { loading, error, createCropHandler, form };
}
