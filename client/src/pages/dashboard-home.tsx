import { StatsCard } from "@/components/stats-card";
import { Users, UserCheck, Building2, CalendarDays } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          {/* Icon strip */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs ring-1 ring-primary/20">
              <UserCheck className="w-3.5 h-3.5" />
              Verified
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-3/10 text-emerald-600 dark:text-emerald-400 text-xs ring-1 ring-emerald-300/30">
              <Users className="w-3.5 h-3.5" />
              Pending
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs ring-1 ring-blue-300/30">
              <Building2 className="w-3.5 h-3.5" />
              Venues
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs ring-1 ring-purple-300/30">
              <CalendarDays className="w-3.5 h-3.5" />
              Schedule
            </span>
          </div>
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
            className="shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5"
          />
          <StatsCard
            title="Pending Teachers"
            value={totalPendingTeachers}
            icon={Users}
            description="Awaiting verification"
            className="shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5"
          />
          <StatsCard
            title="Total Venues"
            value={totalVenues}
            icon={Building2}
            description="Available exam venues"
            className="shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5"
          />
          <StatsCard
            title="Next Exam"
            value={nextExamDate}
            icon={CalendarDays}
            className="shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-0.5"
          />
        </div>
      )}

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

function RecentActivity() {
  const { data, isLoading } = useQuery({
    queryKey: ['/api/admin/venue/getVenueDetails'],
    queryFn: () => api.venues.getAllDetails(),
  });

  const venues: any[] = data?.venues || [];

  const activities =
    venues
      .flatMap((v) =>
        (v.Book?.bookedBy ?? v.bookedBy ?? []).map((b: any) => ({
          title: b.name || b.email || "Unknown",
          description:
            v.Examdate && v.Examtime
              ? `Booked ${v.Examdate} ${v.Examtime}`
              : `Booked venue ${v.ExamVenueId ?? ""}`,
          time: b.bookedAt ?? null,
        }))
      )
      .sort((a, b) => {
        const at = a.time ? new Date(a.time).getTime() : 0;
        const bt = b.time ? new Date(b.time).getTime() : 0;
        return bt - at;
      })
      .slice(0, 8);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="tracking-tight">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 rounded-md bg-muted/50" />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent bookings</p>
        ) : (
          <ul className="divide-y">
            {activities.map((act, idx) => (
              <li key={idx} className="flex items-start justify-between py-4">
                <div className="min-w-0">
                  <p className="font-medium truncate">{act.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {act.description}
                  </p>
                </div>
                <span className="ml-4 shrink-0 text-xs text-muted-foreground">
                  {formatRelativeTime(act.time)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function formatRelativeTime(dateLike: string | number | Date | null) {
  if (!dateLike) return "";
  const now = Date.now();
  const ts = new Date(dateLike).getTime();
  const diff = Math.max(0, now - ts);
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
