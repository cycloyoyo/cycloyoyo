
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const services = [
    {
      icon: 'wrench.fill',
      title: 'Réparation rapide',
      description: 'Intervention à domicile en 48h',
    },
    {
      icon: 'gear',
      title: 'Entretien complet',
      description: 'Révision et maintenance',
    },
    {
      icon: 'clock.fill',
      title: 'Disponibilité',
      description: 'Du lundi au samedi, 9h-18h',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Stack.Screen
        options={{
          title: 'Réparation Vélo',
          headerShown: Platform.OS === 'ios',
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.hero}>
          <View style={styles.heroIcon}>
            <IconSymbol name="bicycle" size={64} color={colors.card} />
          </View>
          <Text style={styles.heroTitle}>Réparation de vélo à domicile</Text>
          <Text style={styles.heroSubtitle}>
            Service professionnel et rapide pour tous vos problèmes de vélo
          </Text>
        </Animated.View>

        {/* CTA Button */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Pressable
            style={styles.ctaButton}
            onPress={() => router.push('/(tabs)/(home)/booking')}
          >
            <IconSymbol name="calendar.badge.plus" size={24} color={colors.card} />
            <Text style={styles.ctaButtonText}>Prendre rendez-vous</Text>
          </Pressable>
        </Animated.View>

        {/* Services Section */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Nos services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceIcon}>
                  <IconSymbol name={service.icon as any} size={32} color={colors.primary} />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* How it works */}
        <Animated.View entering={FadeInDown.delay(600).duration(600)} style={styles.section}>
          <Text style={styles.sectionTitle}>Comment ça marche?</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Prenez rendez-vous</Text>
                <Text style={styles.stepDescription}>
                  Choisissez votre créneau et décrivez le problème
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Confirmation</Text>
                <Text style={styles.stepDescription}>
                  Nous vous contactons pour confirmer
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Intervention</Text>
                <Text style={styles.stepDescription}>
                  Notre technicien vient réparer votre vélo
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Contact Info */}
        <Animated.View entering={FadeInDown.delay(800).duration(600)} style={styles.contactCard}>
          <Text style={styles.contactTitle}>Besoin d&apos;aide?</Text>
          <Text style={styles.contactText}>
            Contactez-nous pour toute question
          </Text>
          <View style={styles.contactInfo}>
            <IconSymbol name="phone.fill" size={20} color={colors.primary} />
            <Text style={styles.contactPhone}>+33 1 23 45 67 89</Text>
          </View>
        </Animated.View>
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
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: colors.secondary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  servicesGrid: {
    gap: 12,
  },
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  stepsContainer: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.card,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: colors.card,
    marginBottom: 16,
    opacity: 0.9,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  contactPhone: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
});
