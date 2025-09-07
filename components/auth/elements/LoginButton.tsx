'use client';
import { Button, ButtonProps } from '@/components/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { REDIRECT_PARAM } from '../constants';
import Link from 'next/link';

interface LoginButtonProps {
  text?: string;
}

export const LoginButton = ({
  text,
  ...props
}: ButtonProps & LoginButtonProps) => {
  let redirect = usePathname();
  const searchParams = useSearchParams();

  if (redirect === '/signup' || redirect === '/login') {
    // use the same redirect target that signup already had, else go home
    const existingRedirectParam = searchParams.get(REDIRECT_PARAM);
    redirect = existingRedirectParam || '/';
  }

  return (
    <Button {...props} asChild>
      <Link href={`/login?${REDIRECT_PARAM}=${encodeURIComponent(redirect)}`}>
        {text}
      </Link>
    </Button>
  );
};
