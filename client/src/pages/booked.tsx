import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookedVenuesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/admin/venue/getAllExamVenuesWithDetails'],
    queryFn: () => api.venues.getAllExamVenuesWithDetails(),
  });

  const examVenues = data?.venues || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Booked Venues</h1>
        <p className="text-muted-foreground">View all exam venues with enrolled teachers</p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-center">
          <p className="text-destructive">Failed to load booked venues. Please try again later.</p>
        </div>
      ) : examVenues.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No booked venues found</p>
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {examVenues.map((venue: any, index: number) => (
          <AccordionItem key={venue.id} value={venue.id} className="border rounded-lg">
            <Card>
              <CardHeader className="pb-3">
                <AccordionTrigger className="hover:no-underline" data-testid={`accordion-venue-${venue.id}`}>
                  <div className="flex items-center justify-between gap-4 w-full pr-4">
                    <CardTitle className="text-lg font-semibold">
                      Exam Venue {index + 1}
                    </CardTitle>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(venue.Examdate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{venue.Examtime}</span>
                      </div>
                      <Badge variant="secondary">
                        <Users className="h-3 w-3 mr-1" />
                        {venue.teachers.length}/{venue.numberOfTeachersCanBook}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
              </CardHeader>
              <AccordionContent>
                <CardContent className="pt-4">
                  {venue.teachers.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No teachers have booked this venue yet
                    </p>
                  ) : (
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Teacher ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {venue.teachers.map((teacher) => (
                            <TableRow key={teacher.id} data-testid={`row-booked-teacher-${teacher.id}`}>
                              <TableCell className="font-mono text-sm">
                                {teacher.teacherId}
                              </TableCell>
                              <TableCell className="font-medium">{teacher.name}</TableCell>
                              <TableCell>{teacher.email}</TableCell>
                              <TableCell>{teacher.phoneNumber}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
