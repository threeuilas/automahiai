'use client';
import { useSession } from '@/auth-client';
import { LoginForm } from '../auth/LoginForm';
import { SignoutButton } from '@/auth/SignoutButton';
import { Skeleton } from '@/components/ui/skeleton';

export default function LoginPage() {
  const session = useSession();
  let content = <LoginForm />;
  if (session.data) {
    content = (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg">You are already logged in.</div>
        <SignoutButton variant="secondary">Sign out</SignoutButton>
      </div>
    );
  } else if (session.isPending) {
    content = <Skeleton className="h-[50px] w-[200px] rounded-xl" />;
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      {content}
    </div>
  );
}
