import AuthPage from '@/components/auth/elements/AuthPage';
import { REDIRECT_PARAM } from '@/components/auth/constants';

interface SignupPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const redirect = (await searchParams)[REDIRECT_PARAM] || '/';

  return <AuthPage type="signup" redirect={redirect} />;
}
