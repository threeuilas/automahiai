import { signOut } from '@/auth-client';
import { useRouter } from 'next/navigation';

export function useSignout() {
  const router = useRouter();
  const signout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
          router.refresh();
        },
      },
    });
  };

  return signout;
}
