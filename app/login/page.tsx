import { AuthPage } from '@/components/auth/elements/AuthPage';
import { REDIRECT_PARAM } from '@/components/auth/constants';

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const redirect = (await searchParams)[REDIRECT_PARAM] || '/';

  return <AuthPage type="login" redirect={redirect} />;
}
