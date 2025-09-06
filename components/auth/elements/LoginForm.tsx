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
import { useRouter } from 'next/navigation';
import { useLoginForm } from '../hooks/useLoginForm';
import { REDIRECT_PARAM } from '../constants';

interface LoginFormProps {
  redirect: string;
}

export function LoginForm({ redirect }: LoginFormProps) {
  const { form, loading, error, login } = useLoginForm(redirect);
  const router = useRouter();

  const signupUrl = `/signup?${REDIRECT_PARAM}=${encodeURIComponent(redirect)}`;
  return (
    <Card className="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={login}>
          <CardContent className="flex flex-col gap-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
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
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                name="remember"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal select-none cursor-pointer">
                      Remember me
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={() => {}}
              >
                Forgot password?
              </Button>
            </div>
            <div className="min-h-[1.5em]">
              {error && (
                <div className="text-red-500 text-sm break-words">{error}</div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push(signupUrl)}
            >
              Sign up
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
