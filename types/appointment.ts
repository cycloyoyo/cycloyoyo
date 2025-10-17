
export interface Appointment {
  id: string;
  address: string;
  date: Date;
  timeSlot: string;
  problem: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
