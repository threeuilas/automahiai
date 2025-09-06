'use client';
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { useCreateFarm } from './useFarmForm';

export interface CreateFarmFormValues {
  name: string;
}

interface CreateFarmFormProps {
  redirect?: string;
}

export function CreateFarmForm({ redirect = '/farm' }: CreateFarmFormProps) {
  const { form, loading, error, createFarmHandler } = useCreateFarm();
  const router = useRouter();

  return (
    <Card className="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle>Create Farm</CardTitle>
        <CardDescription>Create a new farm to get started</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={createFarmHandler}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Farm Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your farm name"
                      autoComplete="organization"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="min-h-[1.5em]">
              {error && (
                <div className="text-red-500 text-sm break-words">{error}</div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Farm...' : 'Create Farm'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push(redirect)}
            >
              Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
