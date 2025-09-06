import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CropIndex() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Crops</h1>
        <Button asChild>
          <Link href="/crop/new">Create Crop</Link>
        </Button>
      </div>
    </div>
  );
}
