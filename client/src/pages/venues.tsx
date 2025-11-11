import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Plus, Trash2, MapPin, CalendarDays, Building2 } from "lucide-react";
import type { Venue } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/lib/api";

export default function VenuesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [venues, setVenues] = useState<any[]>([]); // Use any[] for now since backend shape changed
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newVenue, setNewVenue] = useState({
    date: "",
    time: "",
    capacity: "",
  });
  const { toast } = useToast();

  const fetchVenues = async () => {
    try {
      const data = await api.venues.getAll(); // Use new endpoint
      setVenues(data.venues); // Use data.venues from enriched response
    } catch (error) {
      console.error('Error fetching venues:', error);
      toast({
        title: "Error loading venues",
        description: "Failed to fetch venues. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const filteredVenues = venues.filter(venue =>
    (venue.Examdate + ' ' + venue.Examtime).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddVenue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data before submission
    const capacity = parseInt(newVenue.capacity, 10);
    if (isNaN(capacity) || capacity < 1) {
      toast({
        title: "Validation error",
        description: "Please enter a valid capacity (minimum 1).",
        variant: "destructive",
      });
      return;
    }
    if (!newVenue.date) {
      toast({
        title: "Validation error",
        description: "Date is required.",
        variant: "destructive",
      });
      return;
    }
    if (!newVenue.time) {
      toast({
        title: "Validation error",
        description: "Time is required.",
        variant: "destructive",
      });
      return;
    }
    setIsAdding(true);
    try {
      await api.venues.add({
        Examdate: newVenue.date,
        Examtime: newVenue.time,
        numberOfTeachersCanBook: capacity,
      } as any);
      setNewVenue({ date: "", time: "", capacity: "" });
      toast({
        title: "Venue added",
        description: `Venue has been added successfully.`,
      });
      // Refetch venues to ensure UI matches backend
      await fetchVenues();
    } catch (error) {
      console.error('Error adding venue:', error);
      toast({
        title: "Failed to add venue",
        description: "Could not add venue. Please check your input and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteVenue = async (venue: any) => {
    try {
      await api.venues.delete(venue.ExamVenueId); // Use ExamVenueId for delete
      toast({
        title: "Venue deleted",
        description: `Venue for ${venue.Examdate} ${venue.Examtime} has been removed.`,
        variant: "destructive",
      });
      // Refetch venues to ensure UI matches backend
      await fetchVenues();
    } catch (error) {
      console.error('Error deleting venue:', error);
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteAllVenues = async () => {
    if (!window.confirm("Are you sure you want to delete all venues and reset all teacher bookings? This action cannot be undone.")) return;
    try {
      await api.venues.resetTeachersBookings();
      toast({
        title: "All venues deleted",
        description: "All venues and teacher bookings have been reset.",
        variant: "destructive",
      });
      await fetchVenues();
    } catch (error) {
      const errMsg = (error instanceof Error) ? error.message : "Failed to delete all venues.";
      toast({
        title: "Delete all failed",
        description: errMsg,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-5 pb-6">
      <div className="rounded-xl border border-border/50 bg-card/70 backdrop-blur-xl p-5 shadow-xl">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80" data-testid="text-page-title">Venues</h1>
        <p className="text-xs text-muted-foreground mt-1 font-light">
          {isLoading ? "Loading..." : `${filteredVenues.length} venues available`}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 text-xs font-semibold ring-1 ring-blue-500/30 border border-blue-500/20 backdrop-blur-sm tracking-tight">
            <MapPin className="w-3.5 h-3.5" />
            Locations
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 text-purple-400 text-xs font-semibold ring-1 ring-purple-500/30 border border-purple-500/20 backdrop-blur-sm tracking-tight">
            <CalendarDays className="w-3.5 h-3.5" />
            Dates
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold ring-1 ring-primary/30 border border-primary/20 backdrop-blur-sm tracking-tight">
            <Building2 className="w-3.5 h-3.5" />
            Capacity
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Button onClick={handleDeleteAllVenues} variant="destructive" className="mb-4 shadow-sm hover:shadow transition-all">Delete All Venues</Button>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="tracking-tight text-lg">Venue List</CardTitle>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search venues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                  data-testid="input-search"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              {isLoading ? (
                <p className="text-center text-muted-foreground py-8">Loading venues...</p>
              ) : (
                <div className="overflow-x-auto nice-scrollbar">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-sm font-medium uppercase">Venue Id</TableHead>
                        <TableHead className="text-sm font-medium uppercase">Date</TableHead>
                        <TableHead className="text-sm font-medium uppercase">Time</TableHead>
                        <TableHead className="text-sm font-medium uppercase text-right">Capacity</TableHead>
                        <TableHead className="text-sm font-medium uppercase text-right">Booked</TableHead>
                        <TableHead className="text-sm font-medium uppercase text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVenues.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                            No venues found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredVenues.map((venue) => (
                          <TableRow key={venue.ExamVenueId} data-testid={`row-venue-${venue.ExamVenueId}`}>
                            <TableCell className="text-muted-foreground">{venue.ExamVenueId}</TableCell>
                            <TableCell className="text-muted-foreground">{venue.Examdate}</TableCell>
                            <TableCell className="text-muted-foreground">{venue.Examtime}</TableCell>
                            <TableCell className="text-right tabular-nums">{venue.Book.numberOfTeachersCanBook}</TableCell>
                            <TableCell className="text-right tabular-nums">{venue.Book.bookedBy?.length || 0}</TableCell>
                            <TableCell className="text-right">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    data-testid={`button-delete-${venue.ExamVenueId}`}
                                  >
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete venue?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete the venue for {venue.Examdate} {venue.Examtime}? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteVenue(venue)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="tracking-tight text-lg">Add New Venue</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddVenue} className="space-y-4">
                {/* Venue Name input removed */}
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newVenue.date}
                    onChange={(e) => setNewVenue({ ...newVenue, date: e.target.value })}
                    required
                    data-testid="input-venue-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newVenue.time}
                    onChange={(e) => setNewVenue({ ...newVenue, time: e.target.value })}
                    required
                    data-testid="input-venue-time"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="e.g., 150"
                    value={newVenue.capacity}
                    onChange={(e) => setNewVenue({ ...newVenue, capacity: e.target.value })}
                    required
                    min="1"
                    data-testid="input-venue-capacity"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full shadow-sm hover:shadow transition-all" 
                  disabled={isAdding}
                  data-testid="button-add-venue"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isAdding ? "Adding..." : "Add Venue"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
