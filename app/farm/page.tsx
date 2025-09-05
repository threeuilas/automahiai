import { FarmList } from '@/components/farm';
import { auth } from '@/lib/auth';
import { getUserFarms } from '@/lib/db/data/farms';
import { headers } from 'next/headers';

export default async function Farm() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  console.log(session);

  if (!session?.user) {
    return <div>Unauthenticated...</div>;
  }
  const farms = await getUserFarms(session.user.id);

  return <FarmList farms={farms} />;
}
