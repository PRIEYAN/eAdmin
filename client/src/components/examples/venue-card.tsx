import { VenueCard } from '../venue-card';

export default function VenueCardExample() {
  const mockVenue = {
    id: '1',
    Examdate: '2024-12-15',
    Examtime: '09:00 AM',
    numberOfTeachersCanBook: 50,
    bookedTeachers: 35,
  };

  return (
    <div className="p-6 max-w-sm">
      <VenueCard 
        venue={mockVenue} 
        onDelete={(id) => console.log('Delete venue:', id)}
      />
    </div>
  );
}
