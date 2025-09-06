import { Farm } from '@/lib/db/data/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FarmItemProps {
  farm: Farm;
}

export function FarmItem({ farm }: FarmItemProps) {
  return (
    <Card key={farm.id} className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{farm.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Created: {new Date(farm.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
