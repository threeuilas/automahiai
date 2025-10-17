import { headers } from 'next/headers';

import { CreateCropForm } from '@/components/crops/elements/CreateCropForm';
import { auth } from '@/lib/auth/server';

export default async function CreateCrop() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground">
            You must be logged in to create a crop.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <CreateCropForm redirect="/crops" />
    </div>
  );
}
