interface Farm {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  farmUser: {
    createdAt: Date;
    updatedAt: Date | null;
    userId: string;
    deletedAt: Date | null;
    farmId: number;
    role: 'farmer' | 'customer';
  }[];
}

interface FarmListProps {
  farms: Farm[];
}

export function FarmList({ farms }: FarmListProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Farm List</h1>
      {farms.length === 0 ? (
        <p>No farms found.</p>
      ) : (
        <ul>
          {farms.map((farm) => (
            <li key={farm.id}>
              {farm.name} - Role: {farm.farmUser[0]?.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
