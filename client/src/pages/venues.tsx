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

export default function VenuesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [examDate, setExamDate] = useState("");
  const [examTime, setExamTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const { toast } = useToast();

  //todo: remove mock functionality
  const mockVenues = [
    {
      id: '1',
      Examdate: '2024-12-15',
      Examtime: '09:00 AM',
      numberOfTeachersCanBook: 50,
      bookedTeachers: 35,
    },
    {
      id: '2',
      Examdate: '2024-12-15',
      Examtime: '02:00 PM',
      numberOfTeachersCanBook: 40,
      bookedTeachers: 28,
    },
    {
      id: '3',
      Examdate: '2024-12-16',
      Examtime: '10:00 AM',
      numberOfTeachersCanBook: 45,
      bookedTeachers: 45,
    },
    {
      id: '4',
      Examdate: '2024-12-16',
      Examtime: '03:00 PM',
      numberOfTeachersCanBook: 35,
      bookedTeachers: 12,
    },
  ];

  const handleDelete = (id: string) => {
    console.log('Delete venue:', id);
    toast({
      title: "Venue Deleted",
      description: "The exam venue has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleAddVenue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add venue:', { examDate, examTime, capacity });
    
    setIsDialogOpen(false);
    setExamDate("");
    setExamTime("");
    setCapacity("");
    
    toast({
      title: "Venue Added",
      description: "New exam venue has been successfully created.",
    });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockVenues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} onDelete={handleDelete} />
        ))}
      </div>

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
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" data-testid="button-submit-venue">Create Venue</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
