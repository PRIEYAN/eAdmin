import { TeachersTable } from '../teachers-table';

export default function TeachersTableExample() {
  const mockTeachers = [
    {
      id: '1',
      teacherId: 'T001',
      name: 'John Smith',
      email: 'john@example.com',
      phoneNumber: '+1234567890',
      venuesBooked: 3,
      verified: true,
    },
    {
      id: '2',
      teacherId: 'T002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phoneNumber: '+1234567891',
      venuesBooked: 0,
      verified: false,
    },
  ];

  return (
    <div className="p-6">
      <TeachersTable 
        teachers={mockTeachers} 
        showVerifyButton={true}
        onVerify={(id) => console.log('Verify teacher:', id)}
      />
    </div>
  );
}
