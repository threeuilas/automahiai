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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useSignupForm } from '../hooks/useSignupForm';
import { useRouter } from 'next/navigation';
import { REDIRECT_PARAM } from '../constants';

interface SignupFormProps {
  redirect: string;
}

export function SignupForm({ redirect }: SignupFormProps) {
  const { form, loading, error, signup, fieldErrors } = useSignupForm(redirect);
  const router = useRouter();

  const loginUrl = `/login?${REDIRECT_PARAM}=${encodeURIComponent(redirect)}`;
  console.log('DEBOOG HERE');
  return (
    <>
      <div>DEBUG DFLKSJDFLJ</div>
      <Card className="max-w-sm w-full mx-auto">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={signup}>
            <CardContent className="flex flex-col gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" autoComplete="name" {...field} />
                    </FormControl>
                    <FormMessage>{fieldErrors.name}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" {...field} />
                    </FormControl>
                    <FormMessage>{fieldErrors.email}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldErrors.password}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{fieldErrors.confirmPassword}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="agreeToTerms"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-row items-center gap-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal select-none cursor-pointer">
                        I agree to the terms
                      </FormLabel>
                    </div>
                    <FormMessage>{fieldErrors.agreeToTerms}</FormMessage>
                  </FormItem>
                )}
              />
              <div className="min-h-[1.5em]">
                {error && (
                  <div className="text-red-500 text-sm break-words">
                    {error}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push(loginUrl)}
              >
                Already have an account? Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
