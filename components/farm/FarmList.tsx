'use client';

import { Farm } from '@/lib/db/data/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FarmItem } from './FarmItem';
import { useState } from 'react';

interface FarmListProps {
  farms: Farm[];
}

export function FarmList({ farms: initialFarms }: FarmListProps) {
  const [farms, setFarms] = useState(initialFarms);

  const handleDelete = (farmId: number) => {
    setFarms(farms.filter((farm) => farm.id !== farmId));
  };
  return (
    <>
      {farms.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No farms yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You haven't created any farms yet. Create your first farm to get
              started!
            </p>
            <Button asChild>
              <Link href="/farm/new">Create Your First Farm</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {farms.map((farm) => (
            <FarmItem key={farm.id} farm={farm} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </>
  );
}
