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
    ? new Date(venues.venues[0].Examdate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No exams scheduled";

  return (
    <div className="space-y-6 pb-6">
      {/* Enhanced Header - Dark Theme */}
      <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card/70 backdrop-blur-xl p-6">
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-[-60px] right-[-60px] w-96 h-96 bg-primary/15 blur-[130px]" />
          <div className="absolute bottom-[-60px] left-[-60px] w-96 h-96 bg-chart-2/10 blur-[130px]" />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary/90 to-foreground">
            Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-1 font-light">
            Overview of E-Venue exam booking operations
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <DashboardTag icon={UserCheck} label="Verified" color="primary" />
            <DashboardTag icon={Users} label="Pending" color="emerald" />
            <DashboardTag icon={Building2} label="Venues" color="blue" />
            <DashboardTag icon={CalendarDays} label="Schedule" color="purple" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-36 rounded-xl bg-muted/50" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard
            title="Verified Teachers"
            value={totalVerifiedTeachers}
            icon={UserCheck}
            description="Active and verified"
            className="hover:shadow-xl hover:scale-[1.02] transition-all"
          />
          <StatsCard
            title="Pending Teachers"
            value={totalPendingTeachers}
            icon={Users}
            description="Awaiting verification"
            className="hover:shadow-xl hover:scale-[1.02] transition-all"
          />
          <StatsCard
            title="Total Venues"
            value={totalVenues}
            icon={Building2}
            description="Available exam venues"
            className="hover:shadow-xl hover:scale-[1.02] transition-all"
          />
          <StatsCard
            title="Next Exam"
            value={nextExamDate}
            icon={CalendarDays}
            className="hover:shadow-xl hover:scale-[1.02] transition-all"
          />
        </div>
      )}

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}

function DashboardTag({ icon: Icon, label, color }: any) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/15 text-primary ring-primary/30 border-primary/20",
    emerald: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30 border-emerald-500/20",
    blue: "bg-blue-500/15 text-blue-400 ring-blue-500/30 border-blue-500/20",
    purple: "bg-purple-500/15 text-purple-400 ring-purple-500/30 border-purple-500/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ring-1 border ${colorMap[color]} backdrop-blur-sm tracking-tight`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

/** ---- RecentActivity (same logic, UI tidy) ---- */
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="tracking-tight text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
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
