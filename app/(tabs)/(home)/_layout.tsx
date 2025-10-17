
import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '@/styles/commonStyles';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Réparation Vélo',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="booking"
        options={{
          title: 'Prendre rendez-vous',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="confirmation"
        options={{
          title: 'Confirmation',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
