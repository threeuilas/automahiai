'use client';
import { Button } from '@/components/ui/button';
import { useSignout } from './useSignout';

export const SignoutButton: typeof Button = (props) => {
  const signout = useSignout();

  return <Button {...props} onClick={signout} />;
};
