import { AuthPage } from '@/components/auth/elements/AuthPage';
import { REDIRECT_PARAM } from '@/components/auth/constants';

export default async function SignupPage({
  searchParams,
}: PageProps<'/signup'>) {
  let redirect = (await searchParams)[REDIRECT_PARAM] || '/';
  if (redirect instanceof Array) {
    redirect = redirect[0];
  }

  return <AuthPage type="signup" redirect={redirect} />;
}
