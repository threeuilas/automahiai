'use client';

import { Farm } from '@/lib/schema/farms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useDeleteFarm } from '../hooks/useDeleteFarm';
import Link from 'next/link';

interface FarmItemProps {
  farm: Farm;
}

export function FarmItem({ farm }: FarmItemProps) {
  const { isDeleting, handleDelete } = useDeleteFarm({
    farmId: farm.id,
  });

  return (
    <Link href={`/farms/${farm.id}`}>
      <Card key={farm.id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{farm.name}</CardTitle>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="ml-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Created: {new Date(farm.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
