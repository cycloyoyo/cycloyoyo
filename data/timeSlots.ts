
import { TimeSlot } from '@/types/appointment';

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 18; // 6 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        id: `${date.toISOString()}-${timeString}`,
        time: timeString,
        available: true, // In a real app, this would check against existing bookings
      });
    }
  }
  
  return slots;
};

export const bikeProblems = [
  'Crevaison / Flat tire',
  'Freins défectueux / Brake issues',
  'Chaîne cassée / Broken chain',
  'Dérailleur / Derailleur problems',
  'Roue voilée / Wheel alignment',
  'Pneus usés / Worn tires',
  'Entretien général / General maintenance',
  'Autre / Other',
];
