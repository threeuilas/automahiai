import AuthPage from '@/components/auth/AuthPage';
import { REDIRECT_PARAM } from '@/constants';

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const redirect = decodeURIComponent(
    (await searchParams)[REDIRECT_PARAM] || '/',
  );

  return <AuthPage type="login" redirect={redirect} />;
}
