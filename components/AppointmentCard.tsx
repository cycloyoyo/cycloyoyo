
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { Appointment } from '@/types/appointment';
import { colors } from '@/styles/commonStyles';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onPress }) => {
  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.accent;
      case 'completed':
        return colors.textSecondary;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
      android_ripple={{ color: colors.border }}
    >
      <View style={styles.header}>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(appointment.status) }]}>
          <Text style={styles.statusText}>{getStatusLabel(appointment.status)}</Text>
        </View>
        <Text style={styles.timeSlot}>{appointment.timeSlot}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <IconSymbol name="calendar" size={20} color={colors.primary} />
          <Text style={styles.dateText}>{formatDate(appointment.date)}</Text>
        </View>

        <View style={styles.row}>
          <IconSymbol name="location.fill" size={20} color={colors.primary} />
          <Text style={styles.addressText} numberOfLines={2}>{appointment.address}</Text>
        </View>

        <View style={styles.row}>
          <IconSymbol name="wrench.fill" size={20} color={colors.primary} />
          <Text style={styles.problemText} numberOfLines={2}>{appointment.problem}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: '600',
  },
  timeSlot: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  content: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
    textTransform: 'capitalize',
  },
  addressText: {
    fontSize: 14,
    color: colors.text,
    flex: 1,
  },
  problemText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
});
