import { TeachersTable } from "@/components/teachers-table";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function VerifiedTeachersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/admin/verified/verifiedTeachers'],
    queryFn: () => api.verifiedTeachers.getAll(),
  });

  const teachers = data?.teachers || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Verified Teachers</h1>
        <p className="text-muted-foreground">Teachers who have been verified and can book exam venues</p>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">Failed to load verified teachers. Please try again later.</p>
        </div>
      ) : (
        <TeachersTable teachers={teachers} />
      )}
    </div>
  );
}
