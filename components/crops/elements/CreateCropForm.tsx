'use client';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NumberInput } from '@/components/ui/number-input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useCreateCrop } from '../hooks/useCreateCrop';

export interface CreateCropFormValues {
  name: string;
  type: 'continuous_harvest' | 'harvest_once';
  daysToMaturity: number;
  quantityPerHarvest: number;
  seedVendor: string;
  seedsPerLinearFeet: number;
  plantsPerLinearFeet: number;
  daysBetweenHarvests?: number;
}

interface CreateCropFormProps {
  redirect?: string;
}

export function CreateCropForm({ redirect = '/crops' }: CreateCropFormProps) {
  const { form, loading, error, createCropHandler } = useCreateCrop();
  const harvestType = form.watch('type');

  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader>
        <CardTitle>Create Crop</CardTitle>
        <CardDescription>Add a new crop to your farm</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={createCropHandler}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crop Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter crop name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harvest Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select harvest type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="harvest_once">Harvest Once</SelectItem>
                      <SelectItem value="continuous_harvest">
                        Continuous Harvest
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="daysToMaturity"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days to Maturity</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter days to maturity"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="quantityPerHarvest"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity per Harvest</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter quantity per harvest"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="seedVendor"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seed Vendor</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter seed vendor"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="seedsPerLinearFeet"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seeds per Linear Feet</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter seeds per linear feet"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="plantsPerLinearFeet"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plants per Linear Feet</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="Enter plants per linear feet"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {harvestType === 'continuous_harvest' && (
              <FormField
                name="daysBetweenHarvests"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days Between Harvests</FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="Enter days between harvests"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="min-h-[1.5em]">
              {error && (
                <div className="text-red-500 text-sm break-words">{error}</div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Crop...' : 'Create Crop'}
            </Button>
            <Button asChild type="button" variant="outline" className="w-full">
              <Link href={redirect}>Cancel</Link>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
