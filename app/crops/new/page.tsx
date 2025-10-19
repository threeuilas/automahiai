import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { CreateCropForm } from '@/components/crops/elements/CreateCropForm';
import { auth } from '@/lib/auth/server';
import { REDIRECT_PARAM } from '@/components/auth/constants';

export default async function CreateCrop() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?${REDIRECT_PARAM}=${encodeURIComponent('/crops/new')}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <CreateCropForm redirect="/crops" />
    </div>
  );
}
