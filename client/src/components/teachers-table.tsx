import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import type { Teacher } from "@shared/schema";

interface TeachersTableProps {
  teachers: Teacher[];
  showVerifyButton?: boolean;
  onVerify?: (teacherId: string) => void;
  isVerifying?: boolean;
}

export function TeachersTable({ 
  teachers, 
  showVerifyButton = false, 
  onVerify,
  isVerifying = false 
}: TeachersTableProps) {
  return (
    <div className="rounded-lg border" data-testid="table-teachers">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-center">Venues Booked</TableHead>
            <TableHead className="text-center">Status</TableHead>
            {showVerifyButton && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showVerifyButton ? 7 : 6} className="text-center py-8 text-muted-foreground">
                No teachers found
              </TableCell>
            </TableRow>
          ) : (
            teachers.map((teacher) => (
              <TableRow key={teacher.id} data-testid={`row-teacher-${teacher.id}`}>
                <TableCell className="font-mono text-sm" data-testid={`text-teacher-id-${teacher.id}`}>
                  {teacher.teacherId}
                </TableCell>
                <TableCell className="font-medium" data-testid={`text-teacher-name-${teacher.id}`}>
                  {teacher.name}
                </TableCell>
                <TableCell data-testid={`text-teacher-email-${teacher.id}`}>{teacher.email}</TableCell>
                <TableCell data-testid={`text-teacher-phone-${teacher.id}`}>{teacher.phoneNumber}</TableCell>
                <TableCell className="text-center" data-testid={`text-teacher-venues-${teacher.id}`}>
                  <Badge variant="secondary">{teacher.venuesBooked}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  {teacher.verified ? (
                    <Badge className="bg-green-500 hover:bg-green-600" data-testid={`badge-verified-${teacher.id}`}>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" data-testid={`badge-pending-${teacher.id}`}>
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </TableCell>
                {showVerifyButton && (
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      onClick={() => onVerify?.(teacher.teacherId)}
                      disabled={isVerifying}
                      data-testid={`button-verify-${teacher.id}`}
                    >
                      Verify
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
