import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserCheck, RotateCcw } from "lucide-react";
import type { Teacher } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

import { api } from "@/lib/api";

export default function PendingTeachersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeachers = async () => {
    try {
      const data = await api.pendingTeachers.getAll();
      setTeachers(data.teachers as Teacher[]); // FIX: use data.teachers
    } catch (error) {
      console.error('Error fetching pending teachers:', error);
      toast({
        title: "Error loading teachers",
        description: "Failed to fetch pending teachers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.TeacherId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVerify = async (teacher: Teacher) => {
    try {
      await api.pendingTeachers.verify(teacher.TeacherId);
      setTeachers(teachers.filter(t => t.id !== teacher.id));
      toast({
        title: "Teacher verified",
        description: `${teacher.name} has been successfully verified.`,
      });
    } catch (error) {
      console.error('Error verifying teacher:', error);
      toast({
        title: "Verification failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4 rounded-2xl border bg-card/80 supports-[backdrop-filter]:backdrop-blur p-4 md:p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Pending Teachers</h1>
          <p className="text-muted-foreground mt-2">
            {isLoading ? "Loading..." : `${filteredTeachers.length} pending verification`}
          </p>
        </div>
        
       <Button onClick={fetchTeachers} variant="destructive" className="shadow-sm hover:shadow transition-all" data-testid="button-reset-all">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh
            </Button>

      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="tracking-tight">Pending Verification</CardTitle>
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
                    <TableHead className="text-sm font-medium uppercase text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No pending teachers found
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
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => handleVerify(teacher)}
                            className="bg-chart-3 hover:bg-chart-3/90"
                            data-testid={`button-verify-${teacher.id}`}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Verify
                          </Button>
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
  );
}
