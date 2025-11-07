export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  email: string;
  phoneNumber: string;
  venuesBooked: number;
  verified: boolean;
}

export interface Venue {
  id: string;
  Examdate: string;
  Examtime: string;
  numberOfTeachersCanBook: number;
  bookedTeachers?: number;
}

export interface Admin {
  id: string;
  adminId: string;
  name: string;
  token?: string;
}

export interface DashboardStats {
  totalVerifiedTeachers: number;
  totalPendingTeachers: number;
  totalVenues: number;
  nextExamDate: string;
}

export interface ExamVenueDetail {
  id: string;
  Examdate: string;
  Examtime: string;
  numberOfTeachersCanBook: number;
  teachers: Teacher[];
}
