import { FarmList } from '@/components/farms/elements/FarmList';
import { auth } from '@/lib/auth/server';
import { listUserFarms } from '@/lib/db/data/farms';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { REDIRECT_PARAM } from '@/components/auth/constants';

export default async function Farm() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session);

  if (!session?.user) {
    redirect(`/login?${REDIRECT_PARAM}=${encodeURIComponent('/farms')}`);
  }
  const farms = await listUserFarms(session.user.id);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Farms</h1>
        <Button asChild>
          <Link href="/farms/new">Create Farm</Link>
        </Button>
      </div>
      <FarmList farms={farms} />
    </div>
  );
}
