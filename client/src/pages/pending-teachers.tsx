import { TeachersTable } from "@/components/teachers-table";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function PendingTeachersPage() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/admin/pending/pendingTeachers'],
    queryFn: () => api.pendingTeachers.getAll(),
  });

  const verifyMutation = useMutation({
    mutationFn: (teacherId: string) => api.pendingTeachers.verify(teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pending/pendingTeachers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/verified/verifiedTeachers'] });
      toast({
        title: "Teacher Verified",
        description: "Teacher has been successfully verified.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.response?.data?.message || error.message || "Failed to verify teacher. Please try again.",
        variant: "destructive",
      });
    },
  });

  const resetMutation = useMutation({
    mutationFn: () => api.pendingTeachers.resetBookings(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/pending/pendingTeachers'] });
      toast({
        title: "Bookings Reset",
        description: "All pending teacher bookings have been reset.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Reset Failed",
        description: error.response?.data?.message || error.message || "Failed to reset bookings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleVerify = (teacherId: string) => {
    verifyMutation.mutate(teacherId);
  };

  const handleResetBookings = () => {
    resetMutation.mutate();
  };

  const teachers = data?.teachers || [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Pending Teachers</h1>
          <p className="text-muted-foreground">Teachers awaiting verification</p>
        </div>
        <Button
          variant="outline"
          onClick={handleResetBookings}
          disabled={resetMutation.isPending}
          data-testid="button-reset-bookings"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Bookings
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">Failed to load pending teachers. Please try again later.</p>
        </div>
      ) : (
        <TeachersTable 
          teachers={teachers} 
          showVerifyButton={true}
          onVerify={handleVerify}
          isVerifying={verifyMutation.isPending}
        />
      )}
    </div>
  );
}
