'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { useSignout } from './useSignout';

interface SignoutButtonProps {
  redirect?: string;
  text?: string;
  loadingText?: string;
}

export const SignoutButton = ({
  redirect,
  text,
  loadingText,
  ...props
}: ButtonProps & SignoutButtonProps) => {
  const { signout, loading } = useSignout(redirect);
  if (!loadingText) loadingText = text;

  return (
    <Button {...props} onClick={signout} disabled={loading}>
      {loading ? loadingText : text}
    </Button>
  );
};
