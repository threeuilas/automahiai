import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { FarmDetailsElement } from '@/components/farms/elements/FarmDetailsElement';
import { auth } from '@/lib/auth/server';
import { getFarm } from '@/lib/db/data/farms';
import { getFarmUserRole } from '@/lib/db/data/farmUser';

export default async function FarmPage(props: PageProps<'/farms/[id]'>) {
  const { id } = await props.params;
  const farmId = Number(id);
  if (isNaN(farmId)) return notFound();

  const farm = await getFarm(farmId);
  if (!farm) return notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session
    ? await getFarmUserRole(session.user.id, farmId)
    : undefined;

  return <FarmDetailsElement farm={farm} role={role} loggedIn={!!session} />;
}
