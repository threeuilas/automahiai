'use client';

import { Farm } from '@/lib/db/data/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface FarmItemProps {
  farm: Farm;
  onDelete?: (farmId: number) => void;
}

export function FarmItem({ farm, onDelete }: FarmItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/farm', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ farmId: farm.id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete farm');
      }

      // Call the onDelete callback to refresh the farm list
      onDelete?.(farm.id);
    } catch (error) {
      console.error('Error deleting farm:', error);
      alert('Failed to delete farm. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
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
  );
}
