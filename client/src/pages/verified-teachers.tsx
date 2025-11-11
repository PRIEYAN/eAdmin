import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Teacher } from "@shared/schema";
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
import { UserCheck, RotateCcw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function VerifiedTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await api.verifiedTeachers.getAll();
        setTeachers(data.teachers as Teacher[]); // FIX: use data.teachers
      } catch (error) {
        console.error('Error fetching verified teachers:', error);
        toast({
          title: "Error loading teachers",
          description: "Failed to fetch verified teachers. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, [toast]);

  const handleResetBookings = async () => {
    try {
      await api.pendingTeachers.resetBookings();
      toast({
        title: "Bookings reset",
        description: "All pending teacher bookings have been reset.",
      });
      await fetchTeachers();
    } catch (error) {
      console.error('Error resetting bookings:', error);
      toast({
        title: "Reset failed",
        description: "Failed to reset bookings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.TeacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4 rounded-2xl border bg-card/80 supports-[backdrop-filter]:backdrop-blur p-4 md:p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Verified Teachers</h1>
          <p className="text-muted-foreground mt-2">
            {isLoading ? "Loading..." : `${filteredTeachers.length} verified teachers`}
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="shadow-sm hover:shadow transition-all" data-testid="button-reset-all">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All Bookings
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reset all bookings?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all venue bookings for pending teachers. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="button-cancel-reset">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleResetBookings}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-testid="button-confirm-reset"
              >
                Reset Bookings
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="tracking-tight">Teacher List</CardTitle>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
              data-testid="input-search"
            />
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading teachers...</p>
          ) : (
            <div className="overflow-x-auto nice-scrollbar">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-medium uppercase">Teacher ID</TableHead>
                    <TableHead className="text-sm font-medium uppercase">Name</TableHead>
                    <TableHead className="text-sm font-medium uppercase">Email</TableHead>
                    <TableHead className="text-sm font-medium uppercase">Phone</TableHead>
                    <TableHead className="text-sm font-medium uppercase text-right">Venues Booked</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No verified teachers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.id} data-testid={`row-teacher-${teacher.id}`}>
                        <TableCell className="font-mono text-sm">{teacher.TeacherId}</TableCell>
                        <TableCell className="font-medium">{teacher.name}</TableCell>
                        <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                        <TableCell className="text-muted-foreground">{teacher.PhoneNumber}</TableCell>
                        <TableCell className="text-right tabular-nums">{teacher.numberofvenuesbooked}</TableCell>
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
  );
}
