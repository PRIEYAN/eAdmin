import { StatsCard } from '../stats-card';
import { Users } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      <StatsCard title="Total Teachers" value={125} icon={Users} description="Active this month" />
      <StatsCard title="Pending Reviews" value={8} icon={Users} />
    </div>
  );
}
