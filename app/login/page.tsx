import { auth } from '@/lib/auth';
import { LoginForm } from '../auth/LoginForm';
import { SignoutButton } from '@/auth/SignoutButton';
import { headers } from 'next/headers';

export default async function LoginPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg">You are already logged in.</div>
          <SignoutButton redirect="/login" variant="secondary">
            Sign Out
          </SignoutButton>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
