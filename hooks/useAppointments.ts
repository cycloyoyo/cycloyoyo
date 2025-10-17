
import { useState, useEffect } from 'react';
import { Appointment } from '@/types/appointment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@bike_repair_appointments';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const appointmentsWithDates = parsed.map((apt: any) => ({
          ...apt,
          date: new Date(apt.date),
          createdAt: new Date(apt.createdAt),
        }));
        setAppointments(appointmentsWithDates);
      }
    } catch (error) {
      console.log('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAppointments = async (newAppointments: Appointment[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAppointments));
      setAppointments(newAppointments);
    } catch (error) {
      console.log('Error saving appointments:', error);
    }
  };

  const addAppointment = async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
    };
    
    const updated = [...appointments, newAppointment];
    await saveAppointments(updated);
    return newAppointment;
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    );
    await saveAppointments(updated);
  };

  const deleteAppointment = async (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    await saveAppointments(updated);
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments
      .filter(apt => apt.date >= now && apt.status !== 'cancelled')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const getPastAppointments = () => {
    const now = new Date();
    return appointments
      .filter(apt => apt.date < now || apt.status === 'completed')
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  return {
    appointments,
    loading,
    addAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    getUpcomingAppointments,
    getPastAppointments,
  };
};
