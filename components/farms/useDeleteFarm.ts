'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface UseDeleteFarmProps {
  farmId: number;
}

export function useDeleteFarm({ farmId }: UseDeleteFarmProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch('/api/farms', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: farmId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete farm');
      }

      router.refresh();
    } catch (error) {
      console.error('Error deleting farm:', error);
      alert('Failed to delete farm. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
}
