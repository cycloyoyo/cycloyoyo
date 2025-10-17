
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { generateTimeSlots, bikeProblems } from '@/data/timeSlots';
import { useAppointments } from '@/hooks/useAppointments';

export default function BookingScreen() {
  const { addAppointment } = useAppointments();
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedProblem, setSelectedProblem] = useState('');
  const [customProblem, setCustomProblem] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = generateTimeSlots(selectedDate);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      setSelectedTimeSlot(''); // Reset time slot when date changes
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!address.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse');
      return;
    }
    if (!selectedTimeSlot) {
      Alert.alert('Erreur', 'Veuillez sélectionner un créneau horaire');
      return;
    }
    if (!selectedProblem) {
      Alert.alert('Erreur', 'Veuillez sélectionner le problème de votre vélo');
      return;
    }
    if (selectedProblem === 'Autre / Other' && !customProblem.trim()) {
      Alert.alert('Erreur', 'Veuillez décrire le problème');
      return;
    }

    setLoading(true);
    try {
      const problem = selectedProblem === 'Autre / Other' ? customProblem : selectedProblem;
      
      await addAppointment({
        address: address.trim(),
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        problem: problem.trim(),
      });

      Alert.alert(
        'Rendez-vous confirmé!',
        'Votre demande de rendez-vous a été enregistrée. Nous vous contacterons bientôt.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/(home)/confirmation'),
          },
        ]
      );
    } catch (error) {
      console.log('Error creating appointment:', error);
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen
        options={{
          title: 'Prendre rendez-vous',
          headerShown: true,
          headerBackTitle: 'Retour',
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <IconSymbol name="bicycle" size={48} color={colors.primary} />
          <Text style={styles.title}>Réparation de vélo à domicile</Text>
          <Text style={styles.subtitle}>
            Remplissez le formulaire ci-dessous pour prendre rendez-vous
          </Text>
        </View>

        {/* Address Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Votre adresse *</Text>
          <View style={styles.inputContainer}>
            <IconSymbol name="location.fill" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="123 Rue de la République, Paris"
              placeholderTextColor={colors.textSecondary}
              value={address}
              onChangeText={setAddress}
              multiline
            />
          </View>
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.label}>Date du rendez-vous *</Text>
          <Pressable
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <IconSymbol name="calendar" size={20} color={colors.primary} />
            <Text style={styles.dateButtonText}>
              {selectedDate.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.label}>Créneau horaire *</Text>
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((slot) => (
              <Pressable
                key={slot.id}
                style={[
                  styles.timeSlot,
                  selectedTimeSlot === slot.time && styles.timeSlotSelected,
                  !slot.available && styles.timeSlotDisabled,
                ]}
                onPress={() => slot.available && setSelectedTimeSlot(slot.time)}
                disabled={!slot.available}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTimeSlot === slot.time && styles.timeSlotTextSelected,
                    !slot.available && styles.timeSlotTextDisabled,
                  ]}
                >
                  {slot.time}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Problem Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Problème avec votre vélo *</Text>
          <View style={styles.problemsContainer}>
            {bikeProblems.map((problem) => (
              <Pressable
                key={problem}
                style={[
                  styles.problemChip,
                  selectedProblem === problem && styles.problemChipSelected,
                ]}
                onPress={() => setSelectedProblem(problem)}
              >
                <Text
                  style={[
                    styles.problemChipText,
                    selectedProblem === problem && styles.problemChipTextSelected,
                  ]}
                >
                  {problem}
                </Text>
              </Pressable>
            ))}
          </View>
          {selectedProblem === 'Autre / Other' && (
            <TextInput
              style={[styles.input, styles.customProblemInput]}
              placeholder="Décrivez le problème..."
              placeholderTextColor={colors.textSecondary}
              value={customProblem}
              onChangeText={setCustomProblem}
              multiline
              numberOfLines={3}
            />
          )}
        </View>

        {/* Submit Button */}
        <Pressable
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    minHeight: 24,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    textTransform: 'capitalize',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeSlot: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotDisabled: {
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  timeSlotTextSelected: {
    color: colors.card,
  },
  timeSlotTextDisabled: {
    color: colors.textSecondary,
  },
  problemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  problemChip: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  problemChipSelected: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  problemChipText: {
    fontSize: 14,
    color: colors.text,
  },
  problemChipTextSelected: {
    color: colors.card,
    fontWeight: '600',
  },
  customProblemInput: {
    marginTop: 12,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
});
