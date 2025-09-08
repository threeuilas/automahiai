import type { Farm } from '@/lib/schema/farms';
import type { FarmUserRole } from '@/lib/schema/farmUser';

interface FarmDetailsElementProps {
  farm: Farm;
  role?: FarmUserRole;
  loggedIn: boolean;
}

export function FarmDetailsElement({
  farm,
  // role,
  // loggedIn,
}: FarmDetailsElementProps) {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">{farm.name}</h1>
      <p className="mb-4 text-gray-700">{farm.description}</p>
    </main>
  );
}
