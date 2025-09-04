import AuthPage from '@/components/auth/AuthPage';
import { REDIRECT_PARAM } from '@/constants';

interface SignupPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const redirect = decodeURIComponent(
    (await searchParams)[REDIRECT_PARAM] || '/',
  );

  return <AuthPage type="signup" redirect={redirect} />;
}
