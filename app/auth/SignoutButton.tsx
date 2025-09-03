'use client';
import { signOut } from '@/auth-client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function SignoutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return (
    <Button variant="secondary" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
