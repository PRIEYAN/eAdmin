import { useState } from "react";
import { TeachersTable } from "@/components/teachers-table";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PendingTeachersPage() {
  const { toast } = useToast();
  const [isResetting, setIsResetting] = useState(false);

  //todo: remove mock functionality
  const mockTeachers = [
    {
      id: '5',
      teacherId: 'T005',
      name: 'Dr. Robert Wilson',
      email: 'rwilson@university.edu',
      phoneNumber: '+1 (555) 567-8901',
      venuesBooked: 0,
      verified: false,
    },
    {
      id: '6',
      teacherId: 'T006',
      name: 'Prof. Lisa Anderson',
      email: 'landerson@college.edu',
      phoneNumber: '+1 (555) 678-9012',
      venuesBooked: 0,
      verified: false,
    },
    {
      id: '7',
      teacherId: 'T007',
      name: 'Dr. James Taylor',
      email: 'jtaylor@academy.edu',
      phoneNumber: '+1 (555) 789-0123',
      venuesBooked: 0,
      verified: false,
    },
  ];

  const handleVerify = (teacherId: string) => {
    console.log('Verify teacher:', teacherId);
    toast({
      title: "Teacher Verified",
      description: `Teacher ${teacherId} has been successfully verified.`,
    });
  };

  const handleResetBookings = () => {
    setIsResetting(true);
    //todo: remove mock functionality
    setTimeout(() => {
      setIsResetting(false);
      toast({
        title: "Bookings Reset",
        description: "All pending teacher bookings have been reset.",
      });
    }, 1000);
  };

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
          disabled={isResetting}
          data-testid="button-reset-bookings"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset All Bookings
        </Button>
      </div>

      <TeachersTable 
        teachers={mockTeachers} 
        showVerifyButton={true}
        onVerify={handleVerify}
      />
    </div>
  );
}
