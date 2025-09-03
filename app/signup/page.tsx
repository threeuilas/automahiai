'use client';
import { useSession } from '@/auth-client';
import { SignoutButton } from '@/auth/SignoutButton';
import { SignupForm } from '@/auth/SignupForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function SignupPage() {
  const session = useSession();
  let content = <SignupForm />;
  if (session.data) {
    content = (
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg">You are already logged in.</div>
        <SignoutButton variant="secondary">Sign Out</SignoutButton>
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
