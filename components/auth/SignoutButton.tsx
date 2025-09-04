'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { useSignout } from './useSignout';
import { usePathname } from 'next/navigation';

interface SignoutButtonProps {
  text?: string;
  loadingText?: string;
}

export const SignoutButton = ({
  text,
  loadingText,
  ...props
}: ButtonProps & SignoutButtonProps) => {
  const redirect = usePathname();
  const { signout, loading } = useSignout(redirect);
  if (!loadingText) loadingText = text;

  return (
    <Button {...props} onClick={signout} disabled={loading}>
      {loading ? loadingText : text}
    </Button>
  );
};
