import { TeachersTable } from "@/components/teachers-table";

export default function VerifiedTeachersPage() {
  //todo: remove mock functionality
  const mockTeachers = [
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
    {
      id: '3',
      teacherId: 'T003',
      name: 'Dr. Michael Chen',
      email: 'mchen@academy.edu',
      phoneNumber: '+1 (555) 345-6789',
      venuesBooked: 4,
      verified: true,
    },
    {
      id: '4',
      teacherId: 'T004',
      name: 'Prof. Emily Davis',
      email: 'emily.davis@institute.edu',
      phoneNumber: '+1 (555) 456-7890',
      venuesBooked: 1,
      verified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">Verified Teachers</h1>
        <p className="text-muted-foreground">Teachers who have been verified and can book exam venues</p>
      </div>

      <TeachersTable teachers={mockTeachers} />
    </div>
  );
}
