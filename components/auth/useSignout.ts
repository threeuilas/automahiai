import { signOut } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useSignout(redirect: string = '/') {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const signout = async () => {
    setLoading(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push(redirect);
          router.refresh();
        },
      },
    });
    setLoading(false);
  };

  return { signout, loading };
}
