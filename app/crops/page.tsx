import Link from 'next/link';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { CropList } from '@/components/crops/elements/CropList';
import { getAllCrops } from '@/lib/db/data/crops';
import { auth } from '@/lib/auth/server';
import { REDIRECT_PARAM } from '@/components/auth/constants';

export default async function CropIndex() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  if (!session?.user) {
    redirect(`/login?${REDIRECT_PARAM}=${encodeURIComponent('/crops')}`);
  }

  // Fetch crops data
  const crops = await getAllCrops();

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Crops</h1>
        <Button asChild>
          <Link href="/crops/new">Create Crop</Link>
        </Button>
      </div>
      <CropList crops={crops} />
    </div>
  );
}
