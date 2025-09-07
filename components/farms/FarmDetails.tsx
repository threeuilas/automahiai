import { getFarm } from '@/lib/db/data/farms';
import { notFound } from 'next/navigation';

export default async function FarmPage(props: PageProps<'/farms/[id]'>) {
  const { id } = await props.params;
  const farmId = Number(id);
  if (isNaN(farmId)) return notFound();

  const farm = await getFarm(farmId);
  if (!farm) return notFound();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{farm.name}</h1>
      <p className="mb-4 text-gray-700">{farm.description}</p>
      <div className="text-sm text-gray-500">
        Created: {new Date(farm.createdAt).toLocaleString()}
      </div>
    </main>
  );
}
