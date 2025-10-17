
import { TimeSlot } from '@/types/appointment';

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 16; // 16h00
  const startMinute = 30; // 16h30
  const endHour = 19; // 19h00
  
  // Ajouter le premier créneau à 16h30
  slots.push({
    id: `${date.toISOString()}-16:30`,
    time: '16:30',
    available: true,
  });
  
  // Ajouter les créneaux de 17h00 à 19h00
  for (let hour = 17; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        id: `${date.toISOString()}-${timeString}`,
        time: timeString,
        available: true, // Dans une vraie application, cela vérifierait les réservations existantes
      });
    }
  }
  
  return slots;
};

export const bikeProblems = [
  'Crevaison',
  'Freins défectueux',
  'Chaîne cassée',
  'Dérailleur',
  'Roue voilée',
  'Pneus usés',
  'Entretien général',
  'Autre',
];
