import { StatsCard } from "@/components/stats-card";
import { Users, UserCheck, Building2, CalendarDays } from "lucide-react";

export default function DashboardHome() {
  //todo: remove mock functionality
  const mockStats = {
    totalVerifiedTeachers: 247,
    totalPendingTeachers: 18,
    totalVenues: 12,
    nextExamDate: "December 15, 2024",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground">Overview of E-Venue exam booking system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Verified Teachers"
          value={mockStats.totalVerifiedTeachers}
          icon={UserCheck}
          description="Active and verified"
        />
        <StatsCard
          title="Pending Teachers"
          value={mockStats.totalPendingTeachers}
          icon={Users}
          description="Awaiting verification"
        />
        <StatsCard
          title="Total Venues"
          value={mockStats.totalVenues}
          icon={Building2}
          description="Available exam venues"
        />
        <StatsCard
          title="Next Exam"
          value={mockStats.nextExamDate}
          icon={CalendarDays}
        />
      </div>
    </div>
  );
}
