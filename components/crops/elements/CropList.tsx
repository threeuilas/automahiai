import type { CropAttributeSchemaType } from '@/lib/schema/crops';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Crop {
  id: number;
  name: string;
  attributes: CropAttributeSchemaType;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

interface CropListProps {
  crops: Crop[];
}

export function CropList({ crops }: CropListProps) {
  if (crops.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No crops found. Create your first crop to get started!
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Days to Maturity</TableHead>
          <TableHead>Quantity per Harvest</TableHead>
          <TableHead>Seed Vendor</TableHead>
          <TableHead>Seeds per Linear Feet</TableHead>
          <TableHead>Plants per Linear Feet</TableHead>
          <TableHead>Days Between Harvests</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crops.map((crop) => {
          const isContinuousHarvest =
            crop.attributes.type === 'continuous_harvest';

          return (
            <TableRow key={crop.id}>
              <TableCell className="font-medium">{crop.name}</TableCell>
              <TableCell>
                <Badge variant={isContinuousHarvest ? 'default' : 'secondary'}>
                  {isContinuousHarvest ? 'Continuous' : 'Harvest Once'}
                </Badge>
              </TableCell>
              <TableCell>{crop.attributes.daysToMaturity}</TableCell>
              <TableCell>{crop.attributes.quantityPerHarvest}</TableCell>
              <TableCell>{crop.attributes.seedVendor}</TableCell>
              <TableCell>{crop.attributes.seedsPerLinearFeet}</TableCell>
              <TableCell>{crop.attributes.plantsPerLinearFeet}</TableCell>
              <TableCell>
                {isContinuousHarvest && 'daysBetweenHarvests' in crop.attributes
                  ? crop.attributes.daysBetweenHarvests
                  : '-'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
