'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { useSignout } from './useSignout';

export const SignoutButton = ({
  redirect,
  ...props
}: ButtonProps & { redirect?: string }) => {
  const { signout, loading } = useSignout(redirect);

  return <Button {...props} onClick={signout} disabled={loading} />;
};
