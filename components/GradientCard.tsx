
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '@/styles/commonStyles';

interface GradientCardProps {
  children: React.ReactNode;
  gradient?: string[];
  variant?: 'solid' | 'glass' | 'blur';
  style?: ViewStyle;
  borderRadius?: number;
  padding?: number;
}

export default function GradientCard({
  children,
  gradient = [colors.primary, colors.primaryLight],
  variant = 'solid',
  style,
  borderRadius = 16,
  padding = 20,
}: GradientCardProps) {
  if (variant === 'blur') {
    return (
      <BlurView
        intensity={80}
        tint="light"
        style={[
          styles.container,
          { borderRadius, padding },
          style,
        ]}
      >
        {children}
      </BlurView>
    );
  }

  if (variant === 'glass') {
    return (
      <View
        style={[
          styles.container,
          styles.glass,
          { borderRadius, padding },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.container,
        { borderRadius, padding },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
    elevation: 8,
  },
  glass: {
    backgroundColor: colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
  },
});
