import { StatsCard } from "@/components/stats-card";
import { Users, UserCheck, Building2, CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardHome() {
  const { data: verifiedTeachers, isLoading: loadingVerified } = useQuery({
    queryKey: ['/api/admin/verified/verifiedTeachers'],
    queryFn: () => api.verifiedTeachers.getAll(),
  });

  const { data: pendingTeachers, isLoading: loadingPending } = useQuery({
    queryKey: ['/api/admin/pending/pendingTeachers'],
    queryFn: () => api.pendingTeachers.getAll(),
  });

  const { data: venues, isLoading: loadingVenues } = useQuery({
    queryKey: ['/api/admin/venue/getVenue'],
    queryFn: () => api.venues.getAll(),
  });

  const isLoading = loadingVerified || loadingPending || loadingVenues;

  const totalVerifiedTeachers = verifiedTeachers?.teachers?.length || 0;
  const totalPendingTeachers = pendingTeachers?.teachers?.length || 0;
  const totalVenues = venues?.venues?.length || 0;
  
  const nextExamDate = venues?.venues?.[0]?.Examdate 
    ? new Date(venues.venues[0].Examdate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : "No exams scheduled";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground">Overview of E-Venue exam booking system</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Verified Teachers"
            value={totalVerifiedTeachers}
            icon={UserCheck}
            description="Active and verified"
          />
          <StatsCard
            title="Pending Teachers"
            value={totalPendingTeachers}
            icon={Users}
            description="Awaiting verification"
          />
          <StatsCard
            title="Total Venues"
            value={totalVenues}
            icon={Building2}
            description="Available exam venues"
          />
          <StatsCard
            title="Next Exam"
            value={nextExamDate}
            icon={CalendarDays}
          />
        </div>
      )}
    </div>
  );
}
