import { auth } from '@/lib/auth';
import { LoginForm } from './LoginForm';
import { SignoutButton } from '@/components/auth/SignoutButton';
import { headers } from 'next/headers';
import { SignupForm } from './SignupForm';

interface AuthPageProps {
  type: 'login' | 'signup';
  redirect: string;
}

export default async function AuthPage({ type, redirect }: AuthPageProps) {
  const heads = await headers();
  const session = await auth.api.getSession({ headers: heads });

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg">You are already logged in.</div>
          <SignoutButton variant="secondary" text="Sign Out" />
        </div>
      ) : type === 'login' ? (
        <LoginForm redirect={redirect} />
      ) : (
        <SignupForm redirect={redirect} />
      )}
    </div>
  );
}
