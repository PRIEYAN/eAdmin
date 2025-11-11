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
    <div className="space-y-10 relative">

      {/* Floating gradient header card */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-xl shadow-xl p-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-300/20 blur-[120px] opacity-50" />
        </div>

        <div className="relative z-10">
          <h1 
            className="text-[2.6rem] md:text-[3rem] font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700"
            data-testid="text-page-title"
          >
            Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Overview of E-Venue exam booking system
          </p>
        </div>
      </div>

      {/* Loading skeletons */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton 
              key={i} 
              className="h-36 rounded-2xl shadow-lg bg-muted/50" 
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* STAT CARDS (visual upgrade happens inside StatsCard automatically if styled) */}
          <StatsCard
            title="Verified Teachers"
            value={totalVerifiedTeachers}
            icon={UserCheck}
            description="Active and verified"
            className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          />
          <StatsCard
            title="Pending Teachers"
            value={totalPendingTeachers}
            icon={Users}
            description="Awaiting verification"
            className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          />
          <StatsCard
            title="Total Venues"
            value={totalVenues}
            icon={Building2}
            description="Available exam venues"
            className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          />
          <StatsCard
            title="Next Exam"
            value={nextExamDate}
            icon={CalendarDays}
            className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          />
        </div>
      )}

    </div>
  );
}
