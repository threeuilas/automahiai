'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { REDIRECT_PARAM } from '../constants';

interface LoginButtonProps {
  text?: string;
}

export const LoginButton = ({
  text,
  ...props
}: ButtonProps & LoginButtonProps) => {
  let redirect = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  if (redirect === '/signup') {
    // use the same redirect target that signup already had, else go home
    const existingRedirectParam = searchParams.get(REDIRECT_PARAM);
    redirect = existingRedirectParam || '/';
  }

  let onSubmit = () =>
    router.push(`/login?${REDIRECT_PARAM}=${encodeURIComponent(redirect)}`);
  if (redirect === '/login') {
    // already at /login; do nothing
    onSubmit = () => {};
  }

  return (
    <Button {...props} onClick={onSubmit}>
      {text}
    </Button>
  );
};
