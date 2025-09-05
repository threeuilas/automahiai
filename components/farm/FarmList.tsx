import { Farm } from '@/lib/db/data/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface FarmListProps {
  farms: Farm[];
}

export function FarmList({ farms }: FarmListProps) {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Farms</h1>
        <Button asChild>
          <Link href="/farm/new">Create Farm</Link>
        </Button>
      </div>

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
          ))}
        </div>
      )}
    </div>
  );
}
