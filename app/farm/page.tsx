import { FarmList } from '@/components/farm/FarmList';
import { auth } from '@/lib/auth/server';
import { getUserFarms } from '@/lib/db/data/farms';
import { headers } from 'next/headers';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Farm() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session);

  if (!session?.user) {
    return <div>Unauthenticated...</div>;
  }
  const farms = await getUserFarms(session.user.id);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Farms</h1>
        <Button asChild>
          <Link href="/farm/new">Create Farm</Link>
        </Button>
      </div>
      <FarmList farms={farms} />
    </div>
  );
}
