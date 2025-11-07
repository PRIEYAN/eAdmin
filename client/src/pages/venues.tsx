import { useState } from "react";
import { VenueCard } from "@/components/venue-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function VenuesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/admin/venue/getVenue'],
    queryFn: () => api.venues.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.venues.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/venue/getVenue'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/venue/getAllExamVenuesWithDetails'] });
      toast({
        title: "Venue Deleted",
        description: "The exam venue has been successfully deleted.",
        variant: "destructive",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.response?.data?.message || error.message || "Failed to delete venue. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addMutation = useMutation({
    mutationFn: (venue: { Examdate: string; Examtime: string; numberOfTeachersCanBook: number }) => 
      api.venues.add(venue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/venue/getVenue'] });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/venue/getAllExamVenuesWithDetails'] });
      setIsDialogOpen(false);
      setExamDate("");
      setExamTime("");
      setCapacity("");
      toast({
        title: "Venue Added",
        description: "New exam venue has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Add Venue Failed",
        description: error.response?.data?.message || error.message || "Failed to add venue. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleAddVenue = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate({
      Examdate: examDate,
      Examtime: examTime,
      numberOfTeachersCanBook: parseInt(capacity, 10),
    });
  };

  const venues = data?.venues || [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Exam Venues</h1>
          <p className="text-muted-foreground">Manage exam venues and their capacities</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} data-testid="button-add-venue">
          <Plus className="h-4 w-4 mr-2" />
          Add Venue
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">Failed to load venues. Please try again later.</p>
        </div>
      ) : venues.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground mb-4">No exam venues found</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Venue
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues.map((venue: any) => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent data-testid="dialog-add-venue">
          <DialogHeader>
            <DialogTitle>Add New Exam Venue</DialogTitle>
            <DialogDescription>
              Create a new exam venue with date, time, and capacity information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddVenue}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  required
                  data-testid="input-exam-date"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="examTime">Exam Time</Label>
                <Input
                  id="examTime"
                  type="time"
                  value={examTime}
                  onChange={(e) => setExamTime(e.target.value)}
                  required
                  data-testid="input-exam-time"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Teacher Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  min="1"
                  placeholder="Enter maximum number of teachers"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                  data-testid="input-capacity"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={addMutation.isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={addMutation.isPending} data-testid="button-submit-venue">
                {addMutation.isPending ? "Creating..." : "Create Venue"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
