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

export default function BookedVenuesPage() {
  //todo: remove mock functionality
  const mockExamVenues = [
    {
      id: '1',
      Examdate: '2024-12-15',
      Examtime: '09:00 AM',
      numberOfTeachersCanBook: 50,
      teachers: [
        {
          id: '1',
          teacherId: 'T001',
          name: 'Dr. John Smith',
          email: 'john.smith@university.edu',
          phoneNumber: '+1 (555) 123-4567',
          venuesBooked: 3,
          verified: true,
        },
        {
          id: '2',
          teacherId: 'T002',
          name: 'Prof. Sarah Johnson',
          email: 'sarah.j@college.edu',
          phoneNumber: '+1 (555) 234-5678',
          venuesBooked: 2,
          verified: true,
        },
      ],
    },
    {
      id: '2',
      Examdate: '2024-12-16',
      Examtime: '10:00 AM',
      numberOfTeachersCanBook: 45,
      teachers: [
        {
          id: '3',
          teacherId: 'T003',
          name: 'Dr. Michael Chen',
          email: 'mchen@academy.edu',
          phoneNumber: '+1 (555) 345-6789',
          venuesBooked: 4,
          verified: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Booked Venues</h1>
        <p className="text-muted-foreground">View all exam venues with enrolled teachers</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {mockExamVenues.map((venue, index) => (
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
    </div>
  );
}
